const csv = require('csvtojson')();
const books = require('./backend/database/books');

const csvFilePath='./data/books.csv';

let bookArr = [];
csv.fromFile(csvFilePath).on('json', (json) => {

  bookArr.push(json);

}).on('done', async (error) => {
  if (error) {
    console.log('Error: ' + error);
  } else {
    for (var i = 0; i<bookArr.length; i++) {
      const json = bookArr[i];
      const potentialBook = {
        title: json.title,
        author: json.author,
        description: json.description,
        isbn: json.isbn13,
        category: json.category,
      };

      const result = await books.create(potentialBook);
      if (result.error) {
        console.log('ERROR: ' + JSON.stringify(result));
      }
    }
  }

  console.log('end');
});
