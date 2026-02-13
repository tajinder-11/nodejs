const { BOOKS } = require('../models/book');

const getAllBooks = (req, res) => {
  res.json(BOOKS);
};

const getBookById = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'The id must be of type number' });
  }
  const book = BOOKS.find((e) => e.id === id);
  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with this ${id} does not exists` });
  }
  res.json(book);
};

const createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!author.trim()) {
    return res.status(400).json({ error: 'Author name is required' });
  }

  const book = { id: BOOKS.length + 1, title, author };
  BOOKS.push(book);
  return res.status(201).json({ message: 'Your book has been created' });
};

const deleteBookById = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'The id must be of type number' });
  }
  const indexToDelete = BOOKS.findIndex((e) => e.id === id);
  if (indexToDelete < 0) {
    return res.status(404).json({ error: 'Not found' });
  }
  BOOKS.splice(indexToDelete, 1);
  return res.status(200).json({ message: 'The book deleted successfully' });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById,
};
