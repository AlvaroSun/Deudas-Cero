-- Esquema de la base de datos de DeudasCero para Supabase (PostgreSQL).
-- El servidor lo ejecuta solo al arrancar, pero también podés pegarlo en
-- Supabase → SQL Editor → New query → Run.
-- Se puede ejecutar varias veces sin borrar datos.

CREATE TABLE IF NOT EXISTS usuarios (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre          TEXT NOT NULL,
  email           TEXT NOT NULL,
  password_hash   TEXT NOT NULL,
  rol             TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('usuario', 'admin')),
  fecha_registro  TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Email único sin importar mayúsculas/minúsculas
CREATE UNIQUE INDEX IF NOT EXISTS usuarios_email_unico ON usuarios (lower(email));

CREATE TABLE IF NOT EXISTS sesiones (
  token       TEXT PRIMARY KEY,
  usuario_id  BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  expira      TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS ingresos (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id   BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  descripcion  TEXT NOT NULL,
  monto        DOUBLE PRECISION NOT NULL CHECK (monto >= 0),
  categoria    TEXT NOT NULL,
  fecha        DATE NOT NULL
);
CREATE INDEX IF NOT EXISTS ingresos_usuario ON ingresos (usuario_id);

CREATE TABLE IF NOT EXISTS gastos (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id     BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  descripcion    TEXT NOT NULL,
  monto          DOUBLE PRECISION NOT NULL CHECK (monto >= 0),
  categoria      TEXT NOT NULL,
  fecha          DATE NOT NULL,
  presupuestado  DOUBLE PRECISION CHECK (presupuestado >= 0)
);
CREATE INDEX IF NOT EXISTS gastos_usuario ON gastos (usuario_id);

CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre   TEXT NOT NULL,
  email    TEXT NOT NULL,
  asunto   TEXT,
  mensaje  TEXT NOT NULL,
  fecha    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lecciones completadas de cada curso (una fila por lección)
CREATE TABLE IF NOT EXISTS progreso_cursos (
  usuario_id  BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  curso_id    TEXT NOT NULL,
  leccion     INTEGER NOT NULL CHECK (leccion >= 0),
  fecha       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (usuario_id, curso_id, leccion)
);

-- Seguridad: Supabase publica las tablas en su API REST. Activando RLS sin
-- políticas, nadie puede leerlas desde ahí (ni con la "anon key"); solo
-- nuestro servidor, que se conecta como dueño de las tablas.
ALTER TABLE usuarios          ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones          ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingresos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_contacto ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso_cursos   ENABLE ROW LEVEL SECURITY;
