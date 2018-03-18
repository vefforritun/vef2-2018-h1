const db = require('./database');
const validator = require('./validator');

async function readAllCategories() {
  const query = 'SELECT * FROM Categories;';
  const params = [];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function addCategory(category) {
  if (typeof category !== 'string' || category.length === 0) {
    return validator.createError({ error: 'Invalid category' }, 400);
  }

  try {
    const query = 'INSERT INTO Categories(category) VALUES($1);';
    const result = await db.query(query, [ category ]);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function readCategory(idOrCategory) {
  let query;
  const params = [idOrCategory];
  if (validator.validateID(idOrCategory)) {
    query = 'SELECT * FROM Categories WHERE id=$1;';
  } else if (typeof category !== 'string' || category.length === 0) {
    query = 'SELECT * FROM Categories WHERE category=$1;';
  } else {
    return validator.createError({ error: 'Invalid category or ID' }, 400);
  }

  const result = await db.query(query, params);
  if (result.length > 0) {
    return result[0];
  } else {
    return validator.createError({ error: 'Category not found' }, 404);
  }
}

async function getOrTryCreateCategory(category) {
  let categoryRowResult = await readCategory(category);

  if (categoryRowResult.code === 404) {
    categoryRowResult = await addCategory(category);
  }
  return categoryRowResult
}

async function create(book) {
  const errorMessage = validator.validateBook(book);
  if (errorMessage.length > 0) {
    return validator.createError(errorMessage, 400);
  }

  const { title, isbn, category } = book;
  let author = book.author;
  let description = book.description;
  if (!description) { description = null; }
  if (!author) { author = null; }

  let categoryRowResult = await getOrTryCreateCategory(category);

  if (categoryRowResult.error) {
    return categoryRowResult;
  }

  const query = 'INSERT INTO Books(title, isbn, author, description, category) VALUES($1, $2, $3, $4, $5) returning id;';
  const params = [title, isbn, author, description, categoryRowResult.id];
  try {
    const idsAffected = await db.query(query, params);

    return {
      id: idsAffected[0].id,
      title,
      isbn,
      author,
      description,
      category,
    };
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function readAll() {
  const query = 'SELECT * FROM Books;';
  const params = [];
  try {
    const result = await db.query(query, params);
    return result;
  } catch (e) {
    return validator.createError({ error: e.message }, 400);
  }
}

async function readOne(id) {
  if (!validator.validateID(id)) {
    return validator.createError({ error: 'Invalid id' }, 400);
  }

  const query = 'SELECT * FROM Books WHERE id=$1;';
  const params = [id];
  const result = await db.query(query, params);
  if (result.length > 0) {
    return result[0];
  }
  return validator.createError({ error: 'Note not found' }, 404);
}

async function update(id, book) {
  if (!validator.validateID(id)) {
    return validator.createError({ error: 'Invalid id' }, 400);
  }

  const errorMessage = validator.validateBook(book);
  if (errorMessage.length > 0) {
    return errorMessage;
  }

  const { title, isbn, category } = book;
  let author = book.author;
  let description = book.description;
  if (!description) { description = null; }
  if (!author) { author = null; }

  let categoryRowResult = await getOrTryCreateCategory(category);

  const query = 'UPDATE Books SET title=$1, isbn=$2, author=$3, description=$4, category=$5 WHERE id=$6 returning id;';
  const params = [title, isbn, author, description, categoryRowResult.id, id];

  try {
    const results = await db.query(query, params);
    if (results.length > 0) {
      return {
        id: results[0].id,
        title,
        isbn,
        author,
        description,
        category,
      };
    } else {
      return validator.createError({ error: 'Note not found' }, 404);
    }
  } catch (error) {
    return validator.createError({ error: error.message }, 400);
  }
}

async function del(id) {
  const query = 'DELETE FROM Books WHERE id=$1';
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
  readAllCategories,
  readCategory,
  addCategory,
  getOrTryCreateCategory,
};
