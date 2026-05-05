import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT ?? 8000;

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  return res.json({ status: 'Server is up and running...' });
});

app.listen(port, () => {
  console.log('Server is running at port', port);
});
