const users = require('./database/users');
const express = require('express')
const auth = require('./backend/auth')();

const router = express.Router()

router.use(auth.initialize());

router.get('/me', auth.authenticate(), async (req, res) => {

});

router.patch('/me', auth.authenticate(), async (req, res) => {
  const id = req.user.id;
  let user = await users.readOne(id);
  const { name, password } = req.body;
  user.name = name;
  user.password = password;
  const queryObject = users.preparePotentialUser(user);
  const result = users.update(id, queryObject);
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
