import express from 'express';
import router from './routes/index.routes.js';
import db from './db/index.js';
import { userSessions, usersTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(async function (req, res, next) {
  try {
    const tokenHeader = req.headers['authorization'];

    // Header authorization: Bearer <Token>
    if (!tokenHeader) {
      return next();
    }

    if (!tokenHeader.startsWith('Bearer')) {
      return res
        .json(400)
        .json({ error: 'Authorization header must start with Bearer' });
    }

    const token = tokenHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
});
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
