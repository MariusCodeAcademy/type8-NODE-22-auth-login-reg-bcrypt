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

// GET /users - grazina visus vartojus json formatu

app.listen(PORT, () => console.log('server online on port', PORT));
