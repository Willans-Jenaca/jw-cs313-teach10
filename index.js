// Require and instantiate an app object
const express = require('express');
const app = express();

// Following example from https://github.com/heroku/node-js-getting-started/
// This allows us to run it locally or remotely on Heroku
const PORT = process.env.PORT || 5000;

// operand map
const OP_FUNC = {
  add: add,
  sub: sub,
  mul: mul,
  div: div,
};

// op symbol map
const OP_SYMB = {
  add: '+',
  sub: '-',
  mul: 'x',
  div: '/',
};

app.use(express.static('public'));

// We'll set our view engine to ejs
app.set('view engine', 'ejs');

// And here's our home page
app.get('/', (req, res) => res.render('home'));

// Our math page
app.get('/math', (req, res) => {
  let result = OP_FUNC[req.query.operator](+req.query.op1, +req.query.op2);
  console.log(result);
  res.render('result', {
    op1: +req.query.op1,
    op2: +req.query.op2,
    op: OP_SYMB[req.query.operator],
    result: result,
  });
});

// Our math service
app.get('/math_service/:op/:op1/:op2', (req, res) => {
  console.log(req.params);
  let result = OP_FUNC[req.params.op](+req.params.op1, +req.params.op2);
  console.log(result);
  res.json({
    op1: +req.params.op1,
    op2: +req.params.op2,
    op: OP_SYMB[req.params.op],
    result: result,
  });
});

function add(op1, op2) {
  return op1 + op2;
}

function sub(op1, op2) {
  return op1 - op2;
}

function mul(op1, op2) {
  return op1 * op2;
}

function div(op1, op2) {
  return op1 / op2;
}

// Let's start listening
app.listen(PORT, () => console.log(`listening on ${PORT}`));
