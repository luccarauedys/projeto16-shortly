import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const db = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default db;

// import pg from "pg";
// import dotenv from "dotenv";
// dotenv.config();

// const { Pool } = pg;

// const databaseConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

// const db = new Pool(databaseConfig);

// export default db;