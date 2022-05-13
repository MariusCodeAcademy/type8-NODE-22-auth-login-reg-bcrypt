const express = require('express');
const { getAllBooksDb, allBooksWithAuthors } = require('../model/booksModel');

const booksRoutes = express.Router();
// sukuriam booksRoutes routeri

// GET /books - grazinti visas knygas
booksRoutes.get('/books', async (req, res) => {
  try {
    const allBooksArr = await getAllBooksDb();
    res.json(allBooksArr);
  } catch (error) {
    // console.log('stack=== ', error.stack);
    res.sendStatus(500);
  }
});
// extra booksModel funkcija getAllBooksDB

// GET /books-authors - grazinam visas knygas su autoriu vardais ir pavardem.
booksRoutes.get('/books-authors', async (req, res) => {
  try {
    const allBooksArr = await allBooksWithAuthors();
    res.json(allBooksArr);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = booksRoutes;
