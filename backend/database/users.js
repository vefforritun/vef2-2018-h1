const db = require('./database');
const validator = require('./validator');
const bc = require('bcrypt');

async function create(user) {
  const errorMessage = validator.validateUser(user);
  if (errorMessage.length > 0) {
    return validator.createError(errorMessage, 400);
  }

  const { username, passwordhash, name, image } = user;

  const query = 'INSERT INTO Users(username, passwordhash, name, image) VALUES($1, $2, $3, $4) returning username;';
  const params = [
    username,
    passwordhash,
    name,
    image,
  ];

  try {
    const result = await db.query(query, params);
    return result[0].username;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function preparePotentialUser(httpBody) {
  const saltRounds = 10;
  const hash = await bc.hash(httpBody.password, saltRounds);

  const idLessUser = {
    username: httpBody.username,
    passwordhash: hash,
    name: httpBody.name,
    image: httpBody.image,
  }

  return idLessUser;
}

async function authenticate(user, password) {
  console.log("Authenticating... " + JSON.stringify(user));
  return await bc.compare(password, user.passwordhash);
}

async function readAll() {
  const query = 'SELECT * FROM Users;';
  const params = [];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function readOne(username) {
  if (!validator.validateUsername(username)) {
    return validator.createError({ error: 'Invalid username' }, 400);
  }
  const query = 'SELECT * FROM Users WHERE username=$1;';
  const params = [username];
  const result = await db.query(query, params);
  if (result.length > 0) {
    return result[0];
  }
  return validator.createError({ error: 'User not found' }, 404);
}

async function update(id, { username, passwordhash, name, image } = {}) {
  if (!valdator.validateID(id)) {
    return validator.createError({ error: 'Invalid id' }, 400);
  }

  const errorMessage = validate(title, text, datetime);
  if (errorMessage.length > 0) {
    return errorMessage;
  }
  const query = 'UPDATE Users SET username=$1, passwordhash=$2, name=$3, image=$4 WHERE id=$5 returning id;';
  const params = [username, passwordhash, name, id];

  try {
    const results = await db.query(query, params);
    if (results.length > 0) {
      return {
        id: results[0].id,
        title,
        text,
        datetime,
      };
    }
    return validator.createError({ error: 'User not found' }, 404);
  } catch (error) {
    return validator.createError({ error: error.message }, 400);
  }
}

async function del(id) {
  const query = 'DELETE FROM Users WHERE id=$1';
  const params = [id];
  try {
    await db.query(query, params);
    return 200;
  } catch (err) {
    return 404;
  }
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  del,
  preparePotentialUser,
  authenticate,
};
