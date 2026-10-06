// Base de datos SQLite (archivo local, sin instalar nada extra).
// Usa el módulo nativo node:sqlite, disponible desde Node.js 22.
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashPassword } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "data", "deudascero.db");

mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);

db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS usuarios (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre          TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash   TEXT NOT NULL,
    rol             TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('usuario', 'admin')),
    fecha_registro  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
  );

  CREATE TABLE IF NOT EXISTS sesiones (
    token       TEXT PRIMARY KEY,
    usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    expira      TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ingresos (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id   INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    descripcion  TEXT NOT NULL,
    monto        REAL NOT NULL,
    categoria    TEXT NOT NULL,
    fecha        TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS gastos (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id     INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    descripcion    TEXT NOT NULL,
    monto          REAL NOT NULL,
    categoria      TEXT NOT NULL,
    fecha          TEXT NOT NULL,
    presupuestado  REAL
  );

  CREATE TABLE IF NOT EXISTS mensajes_contacto (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre   TEXT NOT NULL,
    email    TEXT NOT NULL,
    asunto   TEXT,
    mensaje  TEXT NOT NULL,
    fecha    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
  );
`);

// Crea el administrador por defecto si todavía no existe.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@finanzasjoven.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const adminExiste = db.prepare("SELECT id FROM usuarios WHERE rol = 'admin' LIMIT 1").get();
if (!adminExiste) {
  db.prepare("INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, 'admin')")
    .run("Administrador", ADMIN_EMAIL, hashPassword(ADMIN_PASSWORD));
  console.log(`Administrador creado: ${ADMIN_EMAIL}`);
}
