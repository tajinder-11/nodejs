import express from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable } from '../models/user.model.js';
import { randomBytes, createHmac } from 'crypto';
import { signupPostRequestBodySchema } from '../validations/request.validation.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { firstName, lastName, email, password } = validationResult.data;
  const [existingUser] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res
      .status(409)
      .json({ error: `user with email ${email} already exists` });
  }

  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      firstName,
      lastName,
      salt,
      password: hashedPassword,
    })
    .returning({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    });

  return res.status(201).json({ data: user });
});

export default router;
