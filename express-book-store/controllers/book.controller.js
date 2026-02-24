const booksTable = require('../models/book.model.js');
const db = require('../db/index.js');
const { eq } = require('drizzle-orm');

const getAllBooks = async (req, res) => {
  const books = db.select().from(booksTable);
  res.json(books);
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  const [book] = db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with this ${id} does not exists` });
  }
  res.json(book);
};

const createBook = async (req, res) => {
  const { title, authorId } = req.body;
  if (!title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const [result] = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: booksTable.id,
    });
  return res
    .status(201)
    .json({ message: 'Your book has been created', id: result.id });
};

const deleteBookById = async (req, res) => {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));
  return res.status(200).json({ message: 'The book deleted successfully' });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById,
};
