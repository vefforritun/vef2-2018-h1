const books = require('./database/books');
const express = require('express')
const auth = require('./auth')();

const router = express.Router()

router.get('/', async (req, res) => {
  const search = req.query.search;
  let limit = req.query.limit;
  let offset = req.query.offset;
  if (!limit) { limit = 2147483647; }
  if (!offset) { offset = 0; }

  const result = await books.readAll(search, limit, offset);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json({
      limit,
      offset,
      items: result,
    })
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await books.readOne(id);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.post('/', auth.authenticate(), async (req, res) => {
  const potentialBook = req.body;
  const result = await books.create(potentialBook);

  if (result.error) {
    return res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.patch('/:id', auth.authenticate(), async (req, res) => {
  const id = req.params.id;
  const newBook = req.body;
  const result = await books.update(id, newBook);

  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

module.exports = router
