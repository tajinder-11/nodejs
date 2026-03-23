import express from 'express';
import router from './routes/index.routes.js';
import db from './db/index.js';
import { userSessions, usersTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { authenticationMiddlwware } from './middlewares/auth.middleware.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(authenticationMiddlwware);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
