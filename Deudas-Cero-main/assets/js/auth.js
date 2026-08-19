function obtenerUsuarios() {
  var datos = localStorage.getItem('usuarios');
  if (!datos) return [];
  try {
    return JSON.parse(datos);
  } catch (e) {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function sesionActiva() {
  var sesion = localStorage.getItem('sesion');
  if (!sesion) return false;
  try {
    var datos = JSON.parse(sesion);
    return datos && datos.autenticado === true;
  } catch (e) {
    return false;
  }
}

function guardarSesion(usuario) {
  localStorage.setItem('sesion', JSON.stringify({
    autenticado: true,
    usuario: usuario
  }));
}

function cerrarSesion() {
  localStorage.removeItem('sesion');
}

function mostrarMensaje(texto, tipo) {
  var div = document.getElementById('mensaje');
  if (!div) return;
  div.textContent = texto;
  div.style.display = 'block';
  div.className = tipo === 'exito' ? 'texto-exito' : 'texto-alerta';
}

function ocultarMensaje() {
  var div = document.getElementById('mensaje');
  if (!div) return;
  div.style.display = 'none';
}

function manejarRegistro(event) {
  event.preventDefault();
  ocultarMensaje();

  var nombre = document.getElementById('nombre').value.trim();
  var email = document.getElementById('email').value.trim();
  var contrasena = document.getElementById('contrasena').value;
  var confirmar = document.getElementById('confirmar_contrasena').value;

  if (nombre === '' || email === '' || contrasena === '' || confirmar === '') {
    mostrarMensaje('Todos los campos son obligatorios.', 'error');
    return;
  }

  if (contrasena.length < 6) {
    mostrarMensaje('La contrasena debe tener al menos 6 caracteres.', 'error');
    return;
  }

  if (contrasena !== confirmar) {
    mostrarMensaje('Las contrasenas no coinciden.', 'error');
    return;
  }

  var usuarios = obtenerUsuarios();
  var existente = usuarios.find(function(u) { return u.email === email; });

  if (existente) {
    mostrarMensaje('Este correo electronico ya esta registrado.', 'error');
    return;
  }

  var nuevoUsuario = {
    id: Date.now(),
    nombre: nombre,
    email: email,
    contrasena: contrasena
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  mostrarMensaje('Registro exitoso. Ahora podes iniciar sesion.', 'exito');
  setTimeout(function() {
    window.location.href = 'login.html';
  }, 1500);
}

function manejarLogin(event) {
  event.preventDefault();
  ocultarMensaje();

  var email = document.getElementById('email').value.trim();
  var contrasena = document.getElementById('contrasena').value;

  if (email === '' || contrasena === '') {
    mostrarMensaje('Todos los campos son obligatorios.', 'error');
    return;
  }

  var usuarios = obtenerUsuarios();
  var usuario = usuarios.find(function(u) {
    return u.email === email && u.contrasena === contrasena;
  });

  if (!usuario) {
    mostrarMensaje('Correo electronico o contrasena incorrectos.', 'error');
    return;
  }

  guardarSesion({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email
  });

  mostrarMensaje('Inicio de sesion exitoso.', 'exito');
  setTimeout(function() {
    window.location.href = '../index.html';
  }, 1000);
}
