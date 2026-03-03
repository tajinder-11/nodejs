const express = require('express');
const db = require('../db/index.js');
const { read } = require('node:fs');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  getBookByAuthor,
} = require('../controllers/author.controller.js');
const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.get('/:id/books', getBookByAuthor);

module.exports = router;
