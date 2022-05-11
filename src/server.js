const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const PORT = 3000;

// users db
const users = [
  { email: 'james@bond.com', password: '123456' },
  { email: 'jane@doe.com', password: '123456' },
];

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(showBody);

// first middlewere helper
function showBody(req, res, next) {
  // console.log(req.method);
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', (req, res) => {
  // gauti vartotojo email ir password ir irasyti i users
  const { email, password } = req.body;
  const newUser = {
    email,
    password,
  };
  users.push(newUser);

  res.status(201).json('user created');
  console.log('users ===', users);
});

// POST /login - tuscias routas grazina 'bandom prisilogint'
app.post('/login', (req, res) => {
  res.json('bandom prisilogint');
});

// GET /users - grazina visus vartojus json formatu
app.get('/users', (req, res) => {
  res.json(users);
});

// 404 turetu grazinti json objekta
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server online on port', PORT));
