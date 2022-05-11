require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

const PORT = process.env.SERVER_PORT || 5000;

// console.log('PORT ===', PORT);

module.exports = {
  PORT,
  dbConfig,
};
