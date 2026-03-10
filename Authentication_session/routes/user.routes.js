import express from 'express';

const router = express.Router();
import db from '../db/index.js';
import { userSessions, usersTable } from '../db/schema.js';
import { createHmac, randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';

// returns current logged in user
router.get('/', (req, res) => {
  res.send('User route');
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
    .returning({ id: usersTable.id });

  res
    .status(200)
    .json({ status: 'User creates successfully', data: { user_data: user } });
});
// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
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
    res.status(400).json({ error: 'Incorrect password' });
  }

  // Generate session for user
  const [session] = await db
    .insert(userSessions)
    .values({
      userId: existingUser.id,
    })
    .returning({ id: userSessions.id });
  return res.status(200).json({ status: 'success', sessionId: session.id });
});

export default router;
