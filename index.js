// Require and instantiate an app object
const express = require('express');
const app = express();

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM node.person', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

// Following example from https://github.com/heroku/node-js-getting-started/
// This allows us to run it locally or remotely on Heroku
const PORT = process.env.PORT || 5000;



app.use(express.static('public'));

// We'll set our view engine to ejs
app.set('view engine', 'ejs');

// And here's our home page
app.get('/', (req, res) => res.render('home'));



// Let's start listening
app.listen(PORT, () => console.log(`listening on ${PORT}`));
