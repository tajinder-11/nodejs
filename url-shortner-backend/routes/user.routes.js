import express from 'express';
import { signupPostRequestBodySchema } from '../validations/request.validation.js';
import { hashedPasswordWithSalt } from '../utils/hash.js';
import { createNewUser, getUserByEmail } from '../services/user.services.js';
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

  const { salt, password: hashedPassword } = hashedPasswordWithSalt(password);

  const user = await createNewUser({
    email,
    firstName,
    lastName,
    salt,
    password,
  });

  return res.status(201).json({ data: user });
});

export default router;
