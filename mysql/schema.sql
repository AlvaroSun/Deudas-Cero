-- Esquema de la base de datos de DeudasCero para MySQL (8.0+) o MariaDB (10.5+).
-- El servidor lo ejecuta solo al arrancar, pero también podés importarlo a mano
-- (phpMyAdmin → pestaña SQL, o: mysql -u root -p deudascero < mysql/schema.sql).
-- Se puede ejecutar varias veces sin borrar datos.

CREATE TABLE IF NOT EXISTS usuarios (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  email           VARCHAR(200) NOT NULL,
  password_hash   VARCHAR(200) NOT NULL,
  rol             ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario',
  fecha_registro  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- La collation *_ci hace que el email sea único sin importar mayúsculas
  UNIQUE KEY usuarios_email_unico (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sesiones (
  token       CHAR(64) NOT NULL PRIMARY KEY,
  usuario_id  BIGINT UNSIGNED NOT NULL,
  expira      DATETIME NOT NULL,
  CONSTRAINT sesiones_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ingresos (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id   BIGINT UNSIGNED NOT NULL,
  descripcion  VARCHAR(200) NOT NULL,
  monto        DOUBLE NOT NULL CHECK (monto >= 0),
  categoria    VARCHAR(50) NOT NULL,
  fecha        DATE NOT NULL,
  CONSTRAINT ingresos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gastos (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id     BIGINT UNSIGNED NOT NULL,
  descripcion    VARCHAR(200) NOT NULL,
  monto          DOUBLE NOT NULL CHECK (monto >= 0),
  categoria      VARCHAR(50) NOT NULL,
  fecha          DATE NOT NULL,
  presupuestado  DOUBLE NULL CHECK (presupuestado >= 0),
  CONSTRAINT gastos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre   VARCHAR(100) NOT NULL,
  email    VARCHAR(200) NOT NULL,
  asunto   VARCHAR(100) NULL,
  mensaje  TEXT NOT NULL,
  fecha    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
