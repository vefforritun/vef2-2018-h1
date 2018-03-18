const books = require('./database/books');
const express = require('express')
const auth = require('./auth')();

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await books.readAllCategories();
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.post('/', auth.authenticate(), async (req, res) => {
  const result = await books.getOrTryCreateCategory(req.body.category);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

module.exports = router;
