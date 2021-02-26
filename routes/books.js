const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// All Books Route
router.get('/', async (req, res) => {
    res.send('Página de todos os livros')
})

// New Book Route
router.get('/new', (req, res) => {
  res.send('Adicionar novo livro')
})

// Create Author Route
router.post('/', async (req, res) => {
  res.send('Livro criado!')
})

module.exports = router