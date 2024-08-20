import pkg from 'pg';
const { Pool } = pkg;

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company_db',
  password: '',
  port: 5432,
});

export const query = (text, params) => pool.query(text, params);
