const express = require('express');
const db = require('../db/index.js');
const { read } = require('node:fs');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
} = require('../controllers/author.controller.js');
const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);

module.exports = router;
