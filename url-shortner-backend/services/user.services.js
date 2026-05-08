import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable } from '../models/user.model.js';

export async function getUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return existingUser;
}

export async function createNewUser({
  email,
  firstName,
  lastName,
  salt,
  password,
}) {
  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      firstName,
      lastName,
      salt,
      password,
    })
    .returning({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    });
  return user;
}
