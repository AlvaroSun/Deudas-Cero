// Servidor de DeudasCero: API REST + archivos del frontend compilado.
// Uso en producción:  npm run build && npm start
import express from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { query, queryOne, initDb } from "./db.js";
import { hashPassword, verifyPassword, newToken } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0"; // 0.0.0.0 = accesible desde otras PCs por IP
const SESSION_DAYS = 7;
const COOKIE = "dc_session";

const app = express();
app.use(express.json({ limit: "100kb" }));

// ---------- Helpers ----------

function getCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

function publicUser(u) {
  return { id: String(u.id), nombre: u.nombre, email: u.email, rol: u.rol, fechaRegistro: u.fecha_registro };
}

async function startSession(res, usuarioId) {
  const token = newToken();
  const expira = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await query("INSERT INTO sesiones (token, usuario_id, expira) VALUES ($1, $2, $3)", [token, usuarioId, expira]);
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: "lax", expires: expira, path: "/" });
}

// Carga el usuario de la sesión (si existe) en req.user
app.use(async (req, _res, next) => {
  const token = getCookie(req, COOKIE);
  if (token) {
    const row = await queryOne(`
      SELECT u.* FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
      WHERE s.token = $1 AND s.expira > now()
    `, [token]);
    if (row) req.user = row;
  }
  next();
});

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Tenés que iniciar sesión." });
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Tenés que iniciar sesión." });
  if (req.user.rol !== "admin") return res.status(403).json({ error: "Acceso solo para administradores." });
  next();
}

const isText = (v, max = 200) => typeof v === "string" && v.trim().length > 0 && v.length <= max;
const isAmount = (v) => typeof v === "number" && Number.isFinite(v) && v >= 0;
const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- Autenticación ----------

app.post("/api/auth/register", async (req, res) => {
  const { nombre, email, password } = req.body || {};
  if (!isText(nombre, 100) || !isText(email, 200) || typeof password !== "string") {
    return res.status(400).json({ error: "Completá todos los campos." });
  }
  if (!EMAIL_RE.test(email.trim())) return res.status(400).json({ error: "El email no es válido." });
  if (password.length < 6) return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });

  const existe = await queryOne("SELECT id FROM usuarios WHERE lower(email) = lower($1)", [email.trim()]);
  if (existe) return res.status(409).json({ error: "Ya existe una cuenta con ese email." });

  const user = await queryOne(
    "INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [nombre.trim(), email.trim().toLowerCase(), hashPassword(password)]
  );
  await startSession(res, user.id);
  res.status(201).json({ user: publicUser(user) });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Completá todos los campos." });
  }
  const user = await queryOne("SELECT * FROM usuarios WHERE lower(email) = lower($1)", [email.trim()]);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: "Email o contraseña incorrectos." });
  }
  await startSession(res, user.id);
  res.json({ user: publicUser(user) });
});

app.post("/api/auth/logout", async (req, res) => {
  const token = getCookie(req, COOKIE);
  if (token) await query("DELETE FROM sesiones WHERE token = $1", [token]);
  res.clearCookie(COOKIE, { path: "/" });
  res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  res.json({ user: req.user ? publicUser(req.user) : null });
});

app.put("/api/auth/me", requireAuth, async (req, res) => {
  const { nombre } = req.body || {};
  if (!isText(nombre, 100)) return res.status(400).json({ error: "El nombre no es válido." });
  const user = await queryOne("UPDATE usuarios SET nombre = $1 WHERE id = $2 RETURNING *", [nombre.trim(), req.user.id]);
  res.json({ user: publicUser(user) });
});

// ---------- Presupuesto: ingresos ----------

const mapIngreso = (r) => ({ id: String(r.id), descripcion: r.descripcion, monto: r.monto, categoria: r.categoria, fecha: r.fecha });

app.get("/api/ingresos", requireAuth, async (req, res) => {
  const rows = await query("SELECT * FROM ingresos WHERE usuario_id = $1 ORDER BY id", [req.user.id]);
  res.json(rows.map(mapIngreso));
});

app.post("/api/ingresos", requireAuth, async (req, res) => {
  const { descripcion, monto, categoria, fecha } = req.body || {};
  if (!isText(descripcion) || !isAmount(monto) || !isText(categoria, 50) || !isDate(fecha)) {
    return res.status(400).json({ error: "Datos del ingreso inválidos." });
  }
  const row = await queryOne(
    "INSERT INTO ingresos (usuario_id, descripcion, monto, categoria, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [req.user.id, descripcion.trim(), monto, categoria, fecha]
  );
  res.status(201).json(mapIngreso(row));
});

app.delete("/api/ingresos/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const borrado = Number.isInteger(id)
    && await queryOne("DELETE FROM ingresos WHERE id = $1 AND usuario_id = $2 RETURNING id", [id, req.user.id]);
  if (!borrado) return res.status(404).json({ error: "Ingreso no encontrado." });
  res.json({ ok: true });
});

// ---------- Presupuesto: gastos ----------

const mapGasto = (r) => ({
  id: String(r.id), descripcion: r.descripcion, monto: r.monto, categoria: r.categoria, fecha: r.fecha,
  presupuestado: r.presupuestado ?? undefined,
});

app.get("/api/gastos", requireAuth, async (req, res) => {
  const rows = await query("SELECT * FROM gastos WHERE usuario_id = $1 ORDER BY id", [req.user.id]);
  res.json(rows.map(mapGasto));
});

app.post("/api/gastos", requireAuth, async (req, res) => {
  const { descripcion, monto, categoria, fecha, presupuestado } = req.body || {};
  if (!isText(descripcion) || !isAmount(monto) || !isText(categoria, 50) || !isDate(fecha)
      || (presupuestado != null && !isAmount(presupuestado))) {
    return res.status(400).json({ error: "Datos del gasto inválidos." });
  }
  const row = await queryOne(
    "INSERT INTO gastos (usuario_id, descripcion, monto, categoria, fecha, presupuestado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [req.user.id, descripcion.trim(), monto, categoria, fecha, presupuestado ?? null]
  );
  res.status(201).json(mapGasto(row));
});

app.delete("/api/gastos/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const borrado = Number.isInteger(id)
    && await queryOne("DELETE FROM gastos WHERE id = $1 AND usuario_id = $2 RETURNING id", [id, req.user.id]);
  if (!borrado) return res.status(404).json({ error: "Gasto no encontrado." });
  res.json({ ok: true });
});

// ---------- Progreso de los cursos ----------

const isCursoId = (v) => /^[a-z0-9-]{1,40}$/i.test(v);
const isLeccion = (v) => Number.isInteger(v) && v >= 0 && v < 1000;

// Devuelve las lecciones completadas de todos los cursos: { "1": [0, 2], "3": [1] }
app.get("/api/cursos/progreso", requireAuth, async (req, res) => {
  const rows = await query(
    "SELECT curso_id, leccion FROM progreso_cursos WHERE usuario_id = $1 ORDER BY curso_id, leccion",
    [req.user.id]
  );
  const progreso = {};
  for (const r of rows) (progreso[r.curso_id] ??= []).push(r.leccion);
  res.json(progreso);
});

// Marca o desmarca una lección como completada
app.put("/api/cursos/:cursoId/lecciones/:leccion", requireAuth, async (req, res) => {
  const { cursoId } = req.params;
  const leccion = Number(req.params.leccion);
  const { completada } = req.body || {};
  if (!isCursoId(cursoId) || !isLeccion(leccion) || typeof completada !== "boolean") {
    return res.status(400).json({ error: "Datos de la lección inválidos." });
  }
  if (completada) {
    await query(
      "INSERT INTO progreso_cursos (usuario_id, curso_id, leccion) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
      [req.user.id, cursoId, leccion]
    );
  } else {
    await query("DELETE FROM progreso_cursos WHERE usuario_id = $1 AND curso_id = $2 AND leccion = $3", [
      req.user.id, cursoId, leccion,
    ]);
  }
  res.json({ ok: true });
});

// ---------- Contacto (público) ----------

app.post("/api/contacto", async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body || {};
  if (!isText(nombre, 100) || !isText(email, 200) || !EMAIL_RE.test(email.trim()) || !isText(mensaje, 5000)) {
    return res.status(400).json({ error: "Completá todos los campos correctamente." });
  }
  await query("INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje) VALUES ($1, $2, $3, $4)", [
    nombre.trim(), email.trim(), typeof asunto === "string" ? asunto.slice(0, 100) : null, mensaje.trim(),
  ]);
  res.status(201).json({ ok: true });
});

// ---------- Administración ----------

app.get("/api/admin/usuarios", requireAdmin, async (_req, res) => {
  const rows = await query("SELECT * FROM usuarios ORDER BY fecha_registro DESC");
  res.json(rows.map(publicUser));
});

app.get("/api/admin/mensajes", requireAdmin, async (_req, res) => {
  res.json(await query("SELECT * FROM mensajes_contacto ORDER BY id DESC"));
});

app.use("/api", (_req, res) => res.status(404).json({ error: "Ruta de API no encontrada." }));

// ---------- Frontend (build de Vite) ----------

if (existsSync(DIST)) {
  app.use(express.static(DIST));
  // Cualquier otra ruta devuelve index.html para que React Router la maneje
  app.get(/.*/, (_req, res) => res.sendFile(path.join(DIST, "index.html")));
} else {
  console.warn("No se encontró la carpeta dist/. Ejecutá `npm run build` para servir el frontend.");
}

// Si falla una consulta (por ejemplo, se cae la conexión con Supabase) respondemos un error claro
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error del servidor. Intentá de nuevo en unos segundos." });
});

try {
  await initDb();
} catch (err) {
  console.error("No se pudo conectar con la base de datos de Supabase:", err.message);
  console.error("Revisá DATABASE_URL en el archivo .env (ver README).");
  process.exit(1);
}

app.listen(PORT, HOST, () => {
  console.log(`DeudasCero escuchando en http://${HOST === "0.0.0.0" ? "<IP-del-servidor>" : HOST}:${PORT}`);
});
