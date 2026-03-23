import express from 'express';

const router = express.Router();
import db from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { createHmac, randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';

router.patch('/', ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  await db
    .update(usersTable)
    .set({ name })
    .where(eq(usersTable.id, req.user.id));
  res.json({ status: 'success' });
});

// returns current logged in user
router.get('/', ensureAuthenticated, async (req, res) => {
  return res.json({ user: req.user });
});

// signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const salt = randomBytes(256).toString('hex');
  const hashedPasword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  const [user] = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPasword, salt })
    // .returning({ id: usersTable.id });
    .returning();

  res.status(200).json({ status: 'User creates successfully', data: { user } });
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!existingUser) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  const salt = existingUser.salt;
  const existingHash = existingUser.password;

  const newHash = createHmac('sha256', salt).update(password).digest('hex');
  if (newHash !== existingHash) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return res.status(200).json({ status: 'success', token });
});

export default router;
