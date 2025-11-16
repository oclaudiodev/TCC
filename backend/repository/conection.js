import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

try {
  const conn = await pool.getConnection();
  console.log("MySQL conectado!");
  conn.release();
} catch (err) {
  console.error("Erro ao conectar:", err);
}

export default pool;