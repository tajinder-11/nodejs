const { booksTable } = require('../models/book.model');
const db = require('../db/index.js');
const { eq, sql } = require('drizzle-orm');

const getAllBooks = async (req, res) => {
  const search = req.query.search;
  console.log('search: ', search);
  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`,
      );
    return res.json(books);
  }
  const books = await db.select().from(booksTable);
  return res.json(books);
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  const [book] = await db
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
  const { title, authorId, description, authorName } = req.body;
  if (!title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const [result] = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
      authorName,
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
