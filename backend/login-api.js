const users = require('./database/users');
const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/register', async (req, res) => {

  const potentialUser = await users.preparePotentialUser(req.body);
  const result = await users.create(potentialUser);

  if (result.error) {
    return res.status(result.code).json(result);
  } else {
    const readOneResult = await users.readOne(result);

    if (readOneResult.error) {
      return res.status(readOneResult.code).json(readOneResult.error);
    }

    res.json({
      id: readOneResult.id,
      username: readOneResult.username,
      name: readOneResult.name,
      image: readOneResult.image,
    });
  }
});

router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Bad Request');
  }

  const result = await users.readOne(req.body.username);
  if (result.error) {
    return res.status(result.code).json(result.error);
  }

  const user = result;

  let authenticated = await users.authenticate(user, req.body.password);
  console.log("Authenticated: " + authenticated);
  if (authenticated) {
    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.SECRET_OR_KEY);

    res.json({
      token,
    })
  } else {
    res.status(401).json({
        error: 'Invalid Credentials',
        code: 401,
    });
  }
});

module.exports = router
