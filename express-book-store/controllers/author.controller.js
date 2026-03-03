const { authorsTable } = require('../models/author.model');
const { booksTable } = require('../models/book.model');
const db = require('../db/index.js');
const { eq } = require('drizzle-orm');

const getAllAuthors = async (req, res) => {
  const author = await db.select().from(authorsTable);
  return res.status(200).json(author);
};

const getAuthorById = async (req, res) => {
  const id = req.params.id;
  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id));

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  return res.status(200).json(author);
};

const createAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const existingAuthor = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.email, email))
    .limit(1);

  if (existingAuthor.length) {
    return res.status(400).json({
      error: 'Conflict',
      message: 'An author with this email already exists.',
    });
  }
  const [result] = await db
    .insert(authorsTable)
    .values({
      firstName,
      lastName,
      email,
    })
    .returning({
      id: authorsTable.id,
    });

  return res.json({ message: 'Your author has been created', id: result.id });
};

const getBookByAuthor = async (req, res) => {
  const id = req.params.id;
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, id));

  return res.json(books);
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  getBookByAuthor,
};
