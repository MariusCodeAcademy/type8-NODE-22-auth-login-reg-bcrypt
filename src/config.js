require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

const PORT = process.env.SERVER_PORT || 5000;

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('no jwt secret found in .env');

// console.log('PORT ===', PORT);

module.exports = {
  PORT,
  dbConfig,
  jwtSecret,
};
