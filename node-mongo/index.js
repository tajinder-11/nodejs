import express from 'express';
import { connectMongoDB } from './connection.js';
import 'dotenv/config';
import userRouter from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

connectMongoDB(process.env.MONGODB_URL).then(() => {
  console.log('MongoDB connected');
});

app.use(express.json());
app.use('/user', userRouter);
app.listen(PORT, () => {
  console.log('server is running on port: ', 8000);
});
