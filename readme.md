## hash passwords

[bcrypt](https://www.npmjs.com/package/bcryptjs)

1. npm i bcryptjs
2. uzkoduoti slaptazodi, hash pass `const hashedPassword = bcrypt.hashSync(plainTextPassword, 10)`
3. palyginti slaptazodzius bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)

### mysql

1. instaliuoti mysql2
2. sukurti .env prisijungimui prie db (config.js)
3. /register route irasyti naujo vartojo duomenis i db lentele users
4. /login route patikrinti ar toks vartotojas egzistuoja
   4.1 surasti vartotoja pagal email
   4.2 jei radom patikrinti ar slaptazodziai sutampa
