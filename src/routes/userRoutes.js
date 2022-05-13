const express = require('express');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../middleware');
const { addUserToDb, findUserByEmail } = require('../model/userModel');

const userRoutes = express.Router();

userRoutes.post('/register', validateUser, async (req, res) => {
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

  if (insertResult === false) {
    res.status(500).json('something wrong');
    return;
  }

  res.status(201).json('user created');
});

// POST /login - tuscias routas grazina 'bandom prisilogint'
userRoutes.post('/login', validateUser, async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;

  // patikrinti ar yra toks email kaip gautas
  const foundUser = await findUserByEmail(gautasEmail);
  console.log('foundUser ===', foundUser);
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
  res.json({ success: true });
  // global cons userSessionId = 124568
});

module.exports = userRoutes;
