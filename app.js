require('dotenv').config();
const express = require('express');
const authConfig = require('./backend/authConfig')
const app = new express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Share public folder
app.use(express.static('public'));

authConfig.configureAuthFor(app);

const hostname = '127.0.0.1';
const port = process.env.PORT;

app.get('/', async (_, res) => {
  res.render('index', {
    title: "Einhver Titill"
  });
});

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
