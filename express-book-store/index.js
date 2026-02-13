const express = require('express');
const bookRouter = require('./routes/book.routes');
const { loggerMiddleware } = require('./middlewares/logger');

const app = express();
const PORT = 8000;

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
