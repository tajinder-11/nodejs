const express = require('express');
const {
  getAllBooks,
  getBookById,
  deleteBookById,
  createBook,
} = require('../controllers/book.controller');
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.delete('/:id', deleteBookById);

module.exports = router;
