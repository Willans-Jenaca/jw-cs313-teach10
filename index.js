// var express = require('express');
// var app = express();

// var pg = require("pg"); // This is the postgres database connection module.
// const connectionString = "postgres://lyon:BrotherLyon1@localhost:5432/'Jenaca'";

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/getPerson', function(request, response) {
// 	getPerson(request, response);
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

// function getPerson(request, response) {
// 	// First get the person's id
// 	var id = request.query.person_id;

// 	// TODO: It would be nice to check here for a valid id before continuing on...

// 	// use a helper function to query the DB, and provide a callback for when it's done
// 	getPersonFromDb(id, function(error, result) {
// 		// This is the callback function that will be called when the DB is done.
// 		// The job here is just to send it back.

// 		// Make sure we got a row with the person, then prepare JSON to send back
// 		if (error || result == null || result.length != 1) {
// 			response.status(500).json({success: false, data: error});
// 		} else {
// 			var person = result[0];
// 			response.status(200).json(result[0]);
// 		}
// 	});
// }

// function getPersonFromDb(id, callback) {
// 	console.log("Getting person from DB with id: " + id);

// 	var client = new pg.Client(connectionString);

// 	client.connect(function(err) {
// 		if (err) {
// 			console.log("Error connecting to DB: ")
// 			console.log(err);
// 			callback(err, null);
// 		}

// 		var sql = "SELECT person_id, person_fname, person_lname, person_dateofbirth FROM node.person WHERE person_id = $1::int";
// 		var params = [id];

// 		var query = client.query(sql, params, function(err, result) {
// 			// we are now done getting the data from the DB, disconnect the client
// 			client.end(function(err) {
// 				if (err) throw err;
// 			});

// 			if (err) {
// 				console.log("Error in query: ")
// 				console.log(err);
// 				callback(err, null);
// 			}

// 			console.log("Found result: " + JSON.stringify(result.rows));

// 			// call whatever function the person that called us wanted, giving it
// 			// the results that we have been compiling
// 			callback(null, result.rows);
// 		});
// 	});

//} // end of getPersonFromDb

// Require and instantiate an app object
const express = require('express');
const app = express();

var pg = require('pg');
// const connectionString = "testuser:testuser@localhost:5432/'Jenaca'";
// var client = new pg.Client(connectionString);

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM node.person', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('views/pages/db', {results: result.rows} ); }
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
