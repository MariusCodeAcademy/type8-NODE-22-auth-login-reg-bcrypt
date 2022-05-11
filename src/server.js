const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { PORT } = require('./config');
const { addUserToDb } = require('./model/userModel');

const app = express();

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

app.post('/register', async (req, res) => {
  // gauti vartotojo email ir password ir irasyti i users
  const { email, password } = req.body;

  const plainTextPassword = password;
  // const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  // console.log('salt ===', salt);
  console.log('hashedPassword ===', hashedPassword);

  // pass = 123456
  // salt = kjhdjs.123456
  // hash = kasdjakhs2k3h2kjhkjasd

  const newUser = {
    email,
    password: hashedPassword,
  };
  // kviesti modelio funkcija kuri sukuria varototoja
  const insertResult = await addUserToDb(newUser.email, newUser.password);
  console.log('insertResult ===', insertResult);

  res.status(201).json('user created');
});

// POST /login - tuscias routas grazina 'bandom prisilogint'
app.post('/login', (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;
  // patikrinti ar yra toks email kaip gautas
  const foundUser = users.find((uObj) => uObj.email === gautasEmail);
  // jei nera 400 email or password not found
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  // jei yra tikrinam ar sutampa slaptazodis
  // bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)
  if (!bcrypt.compareSync(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  res.json('login success');
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
