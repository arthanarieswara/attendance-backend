const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 🔐 FORCE SSL ON RENDER / PRODUCTION
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

pool
  .connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch(err => {
    console.error('PostgreSQL connection error:', err.message);
    process.exit(1); // stop app if DB fails
  });

module.exports = pool;
