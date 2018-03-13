const express = require('express');
const app = express();

var pg = require('pg');
// const connectionString = "postgres://testuser:testuser@localhost:5432/'Jenaca'";
// var client = new pg.Client(connectionString);

  app.get('/', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      client.query('SELECT * FROM node.person', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('home', {results: result.rows} ); }
    });
  });
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
