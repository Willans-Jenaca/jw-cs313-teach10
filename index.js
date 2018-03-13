const express = require('express');
const app = express();

var pg = require('pg');

// And here's our home page
 app.get('/', (req, res) => res.render('home'));
//app.get('/', (req, res) => res.send('Hello World'));


app.get('/getPerson', function(request, response) {
  getPerson(request, response);
});


// query to select all from database
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
  //response.send("getPerson arrived");
  var id = request.query.id;
  // getPersonFromDb(id, function(error, result) {
   // getPersonFromDb(id {
    getPersonFromDb(id, response);
  //   if (error || result == null || result.length != 1) {
  //     response.status(500).json({success: false, data: error});
  //   } else {
  //     var person = result[0];
  //     response.status(200).json(result[0]);
  //   }
  // });
}

// function getPersonFromDb(id, callback) {
  function getPersonFromDb(id, response) {
  console.log("Getting person from DB with id: " + id);

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
       client.query('SELECT * FROM node.person', function(err, result) {
       done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.render('views/result', {results: result.rows} ); }
      });
  });
    

} // end of getPersonFromDb

