const db = require('./database');
const validator = require('./validator');

function preparePotentialUser(httpBody) {
  // TODO: implementa
}

async function create(user) {
  const errorMessage = validateUser(user);
  if (errorMessage.length > 0) {
    return validator.createError(errorMessage, 400);
  }

  const { username, hash, name, image } = user;

  // TODO: SQL til að setja í töfluna "Users"
}

async function readAll() {
  const query = 'SELECT * FROM Users;';
  const params = [];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return createError({ error: e.message }, 400);
  }
}

async function readOne(id) {
  if (!valdator.validateID(id)) {
    return createError({ error: 'Invalid id' }, 400);
  }
  const query = 'SELECT * FROM Users WHERE id=$1;';
  const params = [id];
  const result = await db.query(query, params);
  if (result.length > 0) {
    return result[0];
  }
  return createError({ error: 'User not found' }, 404);
}

async function update(id, { username, passwordHash, name, image } = {}) {
  if (!valdator.validateID(id)) {
    return createError({ error: 'Invalid id' }, 400);
  }

  const errorMessage = validate(title, text, datetime);
  if (errorMessage.length > 0) {
    return errorMessage;
  }
  const query = 'UPDATE Users SET username=$1, passwordHash=$2, name=$3, image=$4 WHERE id=$5 returning id;';
  const params = [username, passwordHash, name, id];

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
    return createError({ error: 'User not found' }, 404);
  } catch (error) {
    return createError({ error: error.message }, 400);
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
};
