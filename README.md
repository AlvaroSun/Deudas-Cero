# 🪙 FinanzasJoven — Plataforma de Educación Financiera

Plataforma web educativa sobre endeudamiento y finanzas personales para jóvenes latinoamericanos. Incluye módulos de aprendizaje, herramienta de presupuesto, artículos, cursos, quiz y sistema de login con **backend propio (Node.js + Express) y base de datos SQLite**.

---

## 📋 Requisitos previos

Antes de empezar, necesitás tener instalado en tu computadora:

### 1. Node.js (versión 22.13 o superior)

Node.js es el motor que corre JavaScript fuera del navegador. Sin él, nada va a funcionar.

**¿Cómo saber si ya lo tenés?**

Abrí una terminal (ver instrucciones más abajo) y escribí:
```
node --version
```
Si aparece algo como `v22.13.0` o mayor, ya lo tenés. Si dice "comando no encontrado", seguí estos pasos:

- Entrá a https://nodejs.org
- Descargá la versión **LTS** (la recomendada, en verde)
- Instalala como cualquier programa (siguiente → siguiente → instalar)
- Reiniciá la terminal después de instalarlo

---

## 💻 ¿Cómo abrir la terminal?

La terminal es el programa donde escribís comandos de texto. Dependiendo de tu sistema operativo:

### En Windows

**Opción A — Terminal de VS Code (recomendada si ya tenés VS Code):**
1. Abrí VS Code
2. Abrí la carpeta del proyecto: Archivo → Abrir carpeta → seleccioná la carpeta `code` o la que contiene el proyecto
3. Abrí la terminal: menú Terminal → Nueva terminal (o `Ctrl + Ñ`)

**Opción B — PowerShell o CMD:**
1. Presioná `Windows + R`
2. Escribí `powershell` y presioná Enter
3. Navegá hasta la carpeta del proyecto con el comando `cd`:
   ```
   cd C:\Users\TuNombre\Downloads\finanzasjoven
   ```
   *(reemplazá la ruta con la ubicación real de la carpeta)*

### En Mac

1. Presioná `Cmd + Espacio`, escribí "Terminal" y abrila
2. Navegá hasta la carpeta del proyecto:
   ```
   cd /Users/tunombre/Downloads/finanzasjoven
   ```

**Truco para Mac/Windows:** Podés arrastrar la carpeta del proyecto a la terminal y se autocompleta la ruta.

### En Linux

Abrí la terminal con `Ctrl + Alt + T` y navegá a la carpeta del proyecto.

---

## 🚀 Cómo instalar y correr el proyecto

Una vez que tenés la terminal abierta **dentro de la carpeta del proyecto** (donde está el archivo `package.json`), seguí estos pasos en orden:

### Paso 1 — Instalá las dependencias

Las dependencias son todos los paquetes y librerías que usa el proyecto. Solo hay que instalarlos una vez.

```bash
npm install
```

> Esto puede tardar 1 a 3 minutos dependiendo de tu internet. Es normal que aparezcan muchas líneas de texto.

Si `npm` no funciona, probá con:
```bash
npx npm install
```

### Paso 2 — Iniciá el proyecto en modo desarrollo

Necesitás **dos terminales** abiertas en la carpeta del proyecto:

```bash
# Terminal 1 — backend (API + base de datos)
npm run dev:server

# Terminal 2 — frontend (Vite, con recarga automática)
npm run dev
```

### Paso 3 — Abrí el navegador

Entrá a `http://localhost:5173`. Vite redirige automáticamente las llamadas a `/api` al backend (puerto 3000).

---

## 🏫 Instalación en el servidor de la escuela (acceso por IP)

En producción **un solo proceso** sirve la página y la API, en el puerto que elijas.

```bash
# 1. Copiar/clonar el proyecto en el servidor y entrar a la carpeta
git clone https://github.com/AlvaroSun/Deudas-Cero.git
cd Deudas-Cero

# 2. Instalar dependencias y compilar el frontend
npm install
npm run build

# 3. Iniciar el servidor
npm start
```

Después, desde cualquier PC de la red, entrá a:

```
http://<IP-del-servidor>:3000
```

Para saber la IP del servidor: `ip addr` (Linux) o `ipconfig` (Windows).

### Usar solo la IP (sin `:3000`)

El navegador usa el puerto **80** por defecto. Iniciá el servidor en ese puerto:

```bash
# Linux (el puerto 80 requiere permisos de administrador)
sudo PORT=80 npm start

# Windows (PowerShell como administrador)
$env:PORT=80; npm start
```

Y ya se puede entrar con `http://<IP-del-servidor>`.

### Variables de configuración (opcionales)

| Variable | Por defecto | Para qué sirve |
|----------|-------------|----------------|
| `PORT` | `3000` | Puerto donde escucha el servidor |
| `HOST` | `0.0.0.0` | `0.0.0.0` = accesible desde otras PCs de la red |
| `DB_PATH` | `server/data/deudascero.db` | Ubicación del archivo de base de datos |
| `ADMIN_EMAIL` | `admin@finanzasjoven.com` | Email del admin que se crea la primera vez |
| `ADMIN_PASSWORD` | `admin123` | Contraseña de ese admin (**cambiala en el servidor**) |

### Dejarlo corriendo aunque se cierre la terminal (Linux)

```bash
sudo npm install -g pm2
sudo PORT=80 pm2 start server/index.js --name deudascero
pm2 save && pm2 startup
```

Si el servidor tiene firewall, habilitá el puerto: `sudo ufw allow 80` (o el que uses).

---

## 🗂️ Estructura del proyecto

```
finanzasjoven/
├── server/                 ← BACKEND
│   ├── index.js            ← Servidor Express (API + sirve el frontend)
│   ├── db.js               ← Base de datos SQLite y creación de tablas
│   ├── auth.js             ← Hash de contraseñas y tokens de sesión
│   └── data/               ← Archivo de la base de datos (se crea solo)
├── index.html              ← Archivo de entrada para el navegador
├── package.json            ← Lista de dependencias y comandos
├── vite.config.ts          ← Configuración del servidor
└── src/
    ├── main.tsx            ← Punto de entrada de React
    ├── app/
    │   ├── App.tsx         ← Componente raíz con router
    │   ├── routes.tsx      ← Todas las rutas/páginas
    │   ├── context/
    │   │   └── AuthContext.tsx   ← Sistema de login (habla con la API)
    │   ├── lib/
    │   │   ├── api.ts            ← Cliente para llamar al backend
    │   │   └── usePresupuesto.ts ← Carga ingresos y gastos del usuario
    │   ├── components/
    │   │   ├── Layout.tsx        ← Estructura con navbar y footer
    │   │   ├── Navbar.tsx        ← Barra de navegación
    │   │   ├── Footer.tsx        ← Pie de página
    │   │   └── ProtectedRoute.tsx ← Rutas que requieren login
    │   └── pages/
    │       ├── Home.tsx
    │       ├── login/            ← Login y Registro
    │       ├── modulos/          ← Módulos educativos
    │       ├── presupuesto/      ← Herramienta de presupuesto
    │       ├── aprendizaje/      ← Artículos, cursos, quiz, glosario
    │       ├── nosotros/         ← Quiénes somos y contacto
    │       ├── perfil/           ← Perfil de usuario
    │       └── admin/            ← Panel de administración
    └── styles/
        ├── index.css       ← Importa todos los estilos
        ├── theme.css       ← Paleta de colores del proyecto
        └── fonts.css       ← Tipografías (Google Fonts)
```

---

## 🔐 Sistema de login y base de datos

Los usuarios y sus datos se guardan en una base de datos **SQLite** en el servidor (`server/data/deudascero.db`). Las contraseñas se guardan cifradas (scrypt) y la sesión viaja en una cookie segura (`httpOnly`) que dura 7 días.

### Qué puede ver cada visitante

| Sin iniciar sesión | Con sesión | Solo admin |
|--------------------|------------|------------|
| Inicio, Login, Registro, Nosotros, Contacto, portadas de Módulos y Aprendizaje | Cada módulo, toda la herramienta de Presupuesto, Artículos, Cursos, Quiz/Autoevaluación, Glosario, Perfil | Panel de administración |

Si alguien sin sesión intenta entrar a una página privada, aparece una **ventana emergente para iniciar sesión**. Al ingresar se muestra directamente la página que quería ver; si cierra la ventana, vuelve a la portada de la sección. La API también rechaza (error 401) cualquier pedido de datos sin sesión.

### Cuenta de administrador

Se crea automáticamente la primera vez que arranca el servidor:

| Email | Contraseña |
|-------|------------|
| `admin@finanzasjoven.com` | `admin123` |

Podés cambiarla con las variables `ADMIN_EMAIL` y `ADMIN_PASSWORD` **antes del primer arranque**.

### Tablas de la base de datos

| Tabla | Contenido |
|-------|-----------|
| `usuarios` | Nombre, email, contraseña cifrada, rol y fecha de registro |
| `sesiones` | Sesiones activas (token + vencimiento) |
| `ingresos` | Ingresos de cada usuario |
| `gastos` | Gastos de cada usuario |
| `mensajes_contacto` | Mensajes enviados desde el formulario de contacto |

Para ver la base de datos podés usar [DB Browser for SQLite](https://sqlitebrowser.org/). Para empezar de cero, detené el servidor y borrá la carpeta `server/data/`.

### Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Crear cuenta |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| GET / PUT | `/api/auth/me` | Ver / editar usuario actual |
| GET / POST | `/api/ingresos` | Listar / agregar ingresos |
| DELETE | `/api/ingresos/:id` | Borrar un ingreso |
| GET / POST | `/api/gastos` | Listar / agregar gastos |
| DELETE | `/api/gastos/:id` | Borrar un gasto |
| POST | `/api/contacto` | Enviar mensaje de contacto |
| GET | `/api/admin/usuarios` | Lista de usuarios *(admin)* |
| GET | `/api/admin/mensajes` | Mensajes de contacto *(admin)* |

---

## 🗺️ Páginas disponibles

| URL | Página |
|-----|--------|
| `/` | Página de inicio |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |
| `/modulos` | Lista de módulos |
| `/modulos/credito` | Módulo: Crédito y endeudamiento *(requiere login)* |
| `/modulos/ahorro` | Módulo: Cultura del ahorro *(requiere login)* |
| `/modulos/presupuesto-personal` | Módulo: Presupuesto personal *(requiere login)* |
| `/presupuesto` | Herramienta de presupuesto *(requiere login)* |
| `/presupuesto/ingresos` | Registrar ingresos *(requiere login)* |
| `/presupuesto/gastos` | Registrar gastos *(requiere login)* |
| `/presupuesto/resumen` | Gráficos y resumen *(requiere login)* |
| `/aprendizaje` | Centro de aprendizaje |
| `/aprendizaje/articulos` | Lista de artículos *(requiere login)* |
| `/aprendizaje/articulos/1` | Artículo individual *(requiere login)* |
| `/aprendizaje/cursos` | Lista de cursos *(requiere login)* |
| `/aprendizaje/cursos/1` | Curso individual *(requiere login)* |
| `/aprendizaje/quiz` | Autoevaluación financiera (15 preguntas) *(requiere login)* |
| `/aprendizaje/glosario` | Glosario de términos financieros *(requiere login)* |
| `/nosotros` | Quiénes somos |
| `/nosotros/contacto` | Formulario de contacto |
| `/perfil` | Mi perfil *(requiere login)* |
| `/perfil/editar` | Editar perfil *(requiere login)* |
| `/admin/dashboard` | Panel de admin *(solo administrador)* |

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Para qué se usa |
|------------|-----------------|
| **React 18** | Interfaz de usuario |
| **React Router v7** | Navegación entre páginas |
| **Tailwind CSS v4** | Estilos y diseño |
| **Vite** | Servidor de desarrollo y compilación |
| **Recharts** | Gráficos del resumen de presupuesto |
| **Lucide React** | Íconos |
| **Express** | Servidor web y API REST |
| **SQLite** (`node:sqlite`) | Base de datos |

---

## ❓ Problemas frecuentes

### "npm no se reconoce como un comando"

Node.js no está instalado o no se reinició la terminal tras instalarlo. Instalá Node.js desde https://nodejs.org y reiniciá la terminal.

### "Error: Cannot find module" al correr `npm run dev`

Falta instalar las dependencias. Corré primero:
```bash
npm install
```

### La página dice "Cannot GET /"

Asegurate de estar usando la URL correcta: `http://localhost:5173` (no `http://localhost:3000`).

### Cerré la terminal y ahora no funciona

El servidor solo corre mientras la terminal está abierta. Volvé a iniciarlo (`npm start`, o `npm run dev:server` + `npm run dev` en desarrollo), o usá `pm2` como se explica arriba.

### "No se pudo conectar con el servidor"

El backend no está corriendo. En desarrollo, asegurate de tener abierto `npm run dev:server` en otra terminal.

### Desde otra PC no carga la página

- Verificá que usás la IP correcta del servidor y el puerto (`:3000` si no usaste el 80).
- Revisá que el firewall del servidor permita ese puerto.

### "ExperimentalWarning: SQLite is an experimental feature"

Es solo un aviso de Node.js, se puede ignorar.

---

## 🎨 Paleta de colores del proyecto

| Color | Código HEX | Uso |
|-------|-----------|-----|
| Beige cálido | `#F8EBDD` | Fondo principal |
| Marrón terracota | `#9A6A58` | Encabezados, navegación, elementos estructurales |
| Naranja coral | `#E9824A` | Botones principales, acentos interactivos |
| Rojo suave | `#D96B5F` | Alertas, errores, gastos excedidos |
| Verde ahorro | `#7FA66B` | Éxito, ingresos, metas cumplidas |
| Blanco | `#FFFFFF` | Tarjetas, formularios, fondos de componentes |

Para modificar los colores editá el archivo `src/styles/theme.css`.

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| Kevin Sunavi | Product Owner |
| Leonardo Huaman | SCRUM Master |
| Fernando Faccini | Equipo de Desarrollo |
| Belen Fernandez | Equipo de Desarrollo |

---

## 📄 Licencia

Proyecto educativo sin fines de lucro. Todos los datos son ficticios y de uso ilustrativo.
