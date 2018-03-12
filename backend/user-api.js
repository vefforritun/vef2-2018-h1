const users = require('./database/users');
const express = require('express')
const auth = require('./auth')();

const router = express.Router()

router.use(auth.initialize());

router.get('/me', auth.authenticate(), async (req, res) => {

});

router.patch('/me', auth.authenticate(), async (req, res) => {
  const id = req.user.id;
  let user = await users.readOne(id);
  const { name, password } = req.body;

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = password;
    user = await users.preparePotentialUser(user);
  }

  const result = await users.update(id, user);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await users.readOne(id);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.post('/me/profile', (req, res) => {
  // TODO: POST profile mynd
});

module.exports = router
