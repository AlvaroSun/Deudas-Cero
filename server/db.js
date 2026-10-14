// Conexión a la base de datos PostgreSQL de Supabase.
// La cadena de conexión se toma de la variable DATABASE_URL (archivo .env).
import pg from "pg";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashPassword } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error(
    "Falta la variable DATABASE_URL.\n" +
    "Copiá .env.example como .env y pegá la cadena de conexión de Supabase (ver README)."
  );
  process.exit(1);
}

// Las columnas DATE se devuelven como texto "AAAA-MM-DD" (no como Date con zona horaria)
pg.types.setTypeParser(pg.types.builtins.DATE, (v) => v);

const url = new URL(process.env.DATABASE_URL);
const esLocal = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase exige conexión cifrada (SSL); una base local normalmente no
  ssl: esLocal || process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
  max: 5,
});

// Ejecuta una consulta y devuelve las filas
export async function query(sql, params = []) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

// Igual que query, pero devuelve solo la primera fila (o null)
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}

// Crea las tablas (si no existen) y el administrador por defecto
export async function initDb() {
  await pool.query(readFileSync(path.join(__dirname, "..", "supabase", "schema.sql"), "utf8"));

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@finanzasjoven.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  const admin = await queryOne("SELECT id FROM usuarios WHERE rol = 'admin' LIMIT 1");
  if (!admin) {
    await query("INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, 'admin')", [
      "Administrador", ADMIN_EMAIL.toLowerCase(), hashPassword(ADMIN_PASSWORD),
    ]);
    console.log(`Administrador creado: ${ADMIN_EMAIL}`);
  }

  await query("DELETE FROM sesiones WHERE expira <= now()");
}
