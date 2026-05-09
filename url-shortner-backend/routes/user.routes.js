import express from 'express';
import { hashedPasswordWithSalt } from '../utils/hash.js';
import { createNewUser, getUserByEmail } from '../services/user.services.js';
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from '../validations/request.validation.js';
import { createUserToken } from '../utils/token.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { firstName, lastName, email, password } = await validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `user with email ${email} already exists` });
  }

  const { salt, password: hashedPassword } =
    await hashedPasswordWithSalt(password);

  const user = await createNewUser({
    email,
    firstName,
    lastName,
    salt,
    password: hashedPassword,
  });

  return res.status(201).json({ data: user });
});

router.post('/login', async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(404).json({ error: `User with email ${email} does not exist` });
  }

  const { password: hashedPassword } = await hashedPasswordWithSalt(
    password,
    user.salt,
  );

  if (user.password !== hashedPassword) {
    res.status(400).json({ error: 'Invalid password' });
  }

  const token = await createUserToken({ id: user.id });

  res.status(200).json({ token });
});

export default router;
