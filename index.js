// Require and instantiate an express object
const express = require('express')();

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

// We'll set our view engine to ejs
express.set('view engine', 'ejs');

// And here's our home page
express.get('/', (req, res) => res.render('home'));

// Our math page
express.get('/math', (req, res) => {
  let op1 = +req.query.op1;
  let op2 = +req.query.op2;
  let op = req.query.operator;
  let result = OP_FUNC[op](op1, op2);

  console.log(result);
  res.render('result', {
    op1: op1,
    op2: op2,
    op: OP_SYMB[op],
    result: result,
  });
});

// operations
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
express.listen(PORT, () => console.log(`listening on ${PORT}`));
