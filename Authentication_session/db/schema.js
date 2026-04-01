import {
  uuid,
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

export const usersTable = pgTable('usersTable', {
  id: uuid().primaryKey().defaultRandom(),
  role: userRoleEnum().notNull().default('USER'),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const userSessions = pgTable('user_sessions', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
