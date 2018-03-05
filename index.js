// Require and instantiate an express object
const express = require('express')();

// Following example from https://github.com/heroku/node-js-getting-started/
// This allows us to run it locally or remotely on Heroku
const PORT = process.env.PORT || 5000;

// We'll set our view engine to ejs
express.set('view engine', 'ejs');

// And here's our home page
express.get('/', (req, res) => res.render('home'));

// Let's start listening
express.listen(PORT, () => console.log(`listening on ${PORT}`));
