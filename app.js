require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./backend/database/validator');
const login = require('./backend/login-api');
const users = require('./backend/user-api');
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
app.use('/users', users);

const hostname = '127.0.0.1';
const port = process.env.PORT;

app.get('/', auth.authenticate(), async (req, res) => {
  res.render('index', {
    title: 'Einhver Titill' + JSON.stringify(req.user.username),
  });
});

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
