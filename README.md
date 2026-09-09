# 🪙 FinanzasJoven — Plataforma de Educación Financiera

Plataforma web educativa sobre endeudamiento y finanzas personales para jóvenes latinoamericanos. Incluye módulos de aprendizaje, herramienta de presupuesto, artículos, cursos, quiz y sistema de login (front-end con localStorage, sin backend).

---

## 📋 Requisitos previos

Antes de empezar, necesitás tener instalado en tu computadora:

### 1. Node.js (versión 18 o superior)

Node.js es el motor que corre JavaScript fuera del navegador. Sin él, nada va a funcionar.

**¿Cómo saber si ya lo tenés?**

Abrí una terminal (ver instrucciones más abajo) y escribí:
```
node --version
```
Si aparece algo como `v18.0.0` o mayor, ya lo tenés. Si dice "comando no encontrado", seguí estos pasos:

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

### Paso 2 — Iniciá el servidor de desarrollo

```bash
npm run dev
```

Deberías ver algo así en la terminal:

```
  VITE v6.x.x  ready in 800 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Paso 3 — Abrí el navegador

Abrí tu navegador (Chrome, Firefox, Edge...) y entrá a:

```
http://localhost:5173
```

**¡Listo!** La plataforma debería estar corriendo.

---

## 🛑 Cómo detener el servidor

Para parar el servidor, hacé clic en la terminal y presioná:

```
Ctrl + C
```

Confirmá con `S` o `Y` si te lo pide.

---

## 🗂️ Estructura del proyecto

```
finanzasjoven/
├── index.html              ← Archivo de entrada para el navegador
├── package.json            ← Lista de dependencias y comandos
├── vite.config.ts          ← Configuración del servidor
└── src/
    ├── main.tsx            ← Punto de entrada de React
    ├── app/
    │   ├── App.tsx         ← Componente raíz con router
    │   ├── routes.tsx      ← Todas las rutas/páginas
    │   ├── context/
    │   │   └── AuthContext.tsx   ← Sistema de login
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

## 🔐 Sistema de login

El sistema de autenticación funciona **100% en el navegador** usando `localStorage`. No hay servidor ni base de datos real.

### Cuenta de administrador (ya existe)

| Email | Contraseña |
|-------|------------|
| `admin@finanzasjoven.com` | `admin123` |

El administrador puede acceder al panel en `/admin/dashboard` con estadísticas y lista de usuarios registrados.

### Crear una cuenta nueva

Entrá a la página **Registrarme** y completá el formulario. Los datos se guardan en tu navegador (localStorage). Si borrás los datos del navegador, la cuenta desaparece.

### ¿Dónde se guardan los datos?

Todos los datos (usuarios, ingresos, gastos) se guardan en el **localStorage** de tu navegador. Para verlos:
1. Abrí las DevTools del navegador (`F12`)
2. Andá a la pestaña **Application** (o "Almacenamiento")
3. Buscá **Local Storage** → `http://localhost:5173`

| Clave en localStorage | Contenido |
|----------------------|-----------|
| `finanzas_user` | Usuario con sesión activa |
| `finanzas_users` | Lista de todos los usuarios registrados |
| `presupuesto_ingresos` | Registros de ingresos |
| `presupuesto_gastos` | Registros de gastos |

---

## 🗺️ Páginas disponibles

| URL | Página |
|-----|--------|
| `/` | Página de inicio |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |
| `/modulos` | Lista de módulos |
| `/modulos/credito` | Módulo: Crédito y endeudamiento |
| `/modulos/ahorro` | Módulo: Cultura del ahorro |
| `/modulos/presupuesto-personal` | Módulo: Presupuesto personal |
| `/presupuesto` | Herramienta de presupuesto |
| `/presupuesto/ingresos` | Registrar ingresos |
| `/presupuesto/gastos` | Registrar gastos |
| `/presupuesto/resumen` | Gráficos y resumen |
| `/aprendizaje` | Centro de aprendizaje |
| `/aprendizaje/articulos` | Lista de artículos |
| `/aprendizaje/articulos/1` | Artículo individual |
| `/aprendizaje/cursos` | Lista de cursos |
| `/aprendizaje/cursos/1` | Curso individual |
| `/aprendizaje/quiz` | Autoevaluación financiera (15 preguntas) |
| `/aprendizaje/glosario` | Glosario de términos financieros |
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
| **localStorage** | Persistencia de datos (sin backend) |

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

El servidor solo corre mientras la terminal está abierta. Abrí de nuevo la terminal, navigá a la carpeta del proyecto y corré:
```bash
npm run dev
```

### Los datos de mi cuenta desaparecieron

Los datos se guardan en el navegador. Si borraste las cookies/caché o usás otro navegador, los datos no van a estar. Tenés que volver a registrarte.

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
