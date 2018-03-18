require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./backend/database/validator');
const login = require('./backend/login');
const auth = require('./backend/auth')();

const app = new express();

app.use(auth.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Share public folder
app.use(express.static('public'));

app.use('/', login);

const hostname = '127.0.0.1';
const port = process.env.PORT;

app.get('/signup', async (_, res) => {
  res.render('signup', {
    title: 'Sign In',
    buttonText: 'Login',
  });
});

app.get('/', /*auth.authenticate(),*/ async (req, res) => {
  res.render('index', {
    title: 'Books', //+ JSON.stringify(req.user.username)
    categories: [
      {
        id: 0,
        category: 'Featured'
      },
      {
        id: 1,
        category: 'Science Fiction'
      },
      {
        id: 2,
        category: 'Fiction'
      },
      {
        id: 3,
        category: 'Biography'
      },
      {
        id: 4,
        category: 'Academic'
      }
    ],
    books: [
    {
      id: 0,
      title: 'Bók 1',
      isbn: '1234567890123',
      author: 'Drífa',
      description: 'gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar.',
      category: 0
    },
    {
      id: 1,
      title: 'Bók 2',
      isbn: '1234567890123',
      author: 'Drífa',
      description: 'gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar.',
      category: 0
    },
    {
      id: 2,
      title: 'Bók 3',
      isbn: '1234567890123',
      author: 'Drífa',
      description: 'gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar.',
      category: 0
    },
    {
      id: 3,
      title: 'Bók 4',
      isbn: '1234567890123',
      author: 'Drífa',
      description: 'gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar.',
      category: 0
    },
    {
      id: 4,
      title: 'Bók 5',
      isbn: '1234567890123',
      author: 'Drífa',
      description: 'gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar.',
      category: 0
    },
    {
      id: 5,
      title: 'Bók 6',
      isbn: '1234567890123',
      author: 'Drífa',
      description: 'gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar, gg kúl, lorem ipsum dolar.',
      category: 0
    }
  ],
  });
});

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
