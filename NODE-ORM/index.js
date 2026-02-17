require('dotenv/config');
const db = require('./db/index');
const { usersTable } = require('./drizzle/schema');

const getAllUsers = async () => {
  const users = await db.select().from(usersTable);
  console.log('USERS: ', users);
  return users;
};

const createUser = async ({ id, name, email, age }) => {
  await db.insert(usersTable).values({
    id,
    name,
    email,
    age,
  });
};

// createUser({ id: 1, name: 'Tajinder', email: 'tj@gmail.com' });
// createUser({ id: 2, name: 'krish', email: 'krish@gmail.com' });
// createUser({ id: 3, name: 'ironman', email: 'ironman@gmail.com' });

getAllUsers();
