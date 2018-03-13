const express = require('express');
const app = express();

var pg = require('pg');

// And here's our home page
app.get('/', (req, res) => res.render('home'));


app.get('/getPerson', function(request, response) {
  getPerson(request, response);
});


// // query to select all from database
//   app.get('/getPerson', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//       client.query('SELECT * FROM node.person', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('views/getPerson', {results: result.rows} ); }
//     });
//   });
// });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getPerson(request, response) {
  var id = request.query.id;
  getPersonFromDb(id, function(error, result) {
    if (error || result == null || result.length != 1) {
      response.status(500).json({success: false, data: error});
    } else {
      var person = result[0];
      response.status(200).json(result[0]);
    }
  });
}

function getPersonFromDb(id, callback) {
  console.log("Getting person from DB with id: " + id);

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }

    var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
    var params = [id];

    var query = client.query(sql, params, function(err, result) {
      // we are now done getting the data from the DB, disconnect the client
      client.end(function(err) {
        if (err) throw err;
      });

      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));

      // call whatever function the person that called us wanted, giving it
      // the results that we have been compiling
      callback(null, result.rows);
    });
  });

} // end of getPersonFromDb

