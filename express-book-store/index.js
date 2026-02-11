const express = require('express');
const fs = require('node:fs');
const { title } = require('node:process');
const app = express();
const PORT = 8000;

// Middlewares (Plugins)
app.use(express.json());

// Custom middlewar to log requests
app.use((req, res, next) => {
  const log = `[${Date.now()}] ${req.method} ${req.path}\n`;
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
});

// In memory database
const books = [
  { id: 1, title: 'Book one', author: 'Author One' },
  { id: 2, title: 'Book two', author: 'Author Two' },
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    return res.status(400).json({ error: 'The id must be of type number' });
  }
  const book = books.find((e) => e.id === id);
  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with this ${id} does not exists` });
  }
  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!author.trim()) {
    return res.status(400).json({ error: 'Author name is required' });
  }

  const book = { id: books.length + 1, title, author };
  books.push(book);
  return res.status(201).json({ message: 'Your book has been created' });
});

app.delete('/book/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'The id must be of type number' });
  }
  const indexToDelete = books.findIndex((e) => e.id === id);
  if (indexToDelete < 0) {
    return res.status(404).json({ error: 'Not found' });
  }
  books.splice(indexToDelete, 1);
  return res.status(200).json({ message: 'The book deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
