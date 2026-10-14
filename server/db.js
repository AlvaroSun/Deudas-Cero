// Conexión a la base de datos MySQL (o MariaDB).
// Los datos de conexión se toman del archivo .env (DB_HOST, DB_USER, etc.).
import mysql from "mysql2/promise";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashPassword } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  charset: "utf8mb4_unicode_ci",
  timezone: "Z",          // todas las fechas se guardan en UTC
  dateStrings: ["DATE"],  // las columnas DATE se devuelven como "AAAA-MM-DD"
};
const DB_NAME = process.env.DB_NAME || "deudascero";

export const pool = mysql.createPool({ ...config, database: DB_NAME, connectionLimit: 5 });

// Cada conexión trabaja en UTC, igual que el servidor
pool.pool.on("connection", (conn) => conn.query("SET time_zone = '+00:00'"));

// SELECT: devuelve las filas
export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// SELECT: devuelve solo la primera fila (o null)
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}

// INSERT / UPDATE / DELETE: devuelve { insertId, affectedRows }
export async function execute(sql, params = []) {
  const [result] = await pool.query(sql, params);
  return result;
}

// Crea la base de datos y las tablas (si no existen) y el administrador por defecto
export async function initDb() {
  const conn = await mysql.createConnection({ ...config, multipleStatements: true });
  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    ).catch(() => {}); // si el usuario no tiene permiso, se asume que la base ya existe
    await conn.query(`USE \`${DB_NAME}\``);
    await conn.query(readFileSync(path.join(__dirname, "..", "mysql", "schema.sql"), "utf8"));
  } finally {
    await conn.end();
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@finanzasjoven.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  const admin = await queryOne("SELECT id FROM usuarios WHERE rol = 'admin' LIMIT 1");
  if (!admin) {
    await execute("INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, 'admin')", [
      "Administrador", ADMIN_EMAIL.toLowerCase(), hashPassword(ADMIN_PASSWORD),
    ]);
    console.log(`Administrador creado: ${ADMIN_EMAIL}`);
  }

  await execute("DELETE FROM sesiones WHERE expira <= NOW()");
}
