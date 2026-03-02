require('dotenv/config');
const express = require('express');
const bookRouter = require('./routes/book.routes');
const authorRouter = require('./routes/author.routes');
const { loggerMiddleware } = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/books', bookRouter);
app.use('/author', authorRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
