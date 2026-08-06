<?php
// Conexion a la base de datos MySQL

$host = 'localhost';
$usuario = 'root';
$contrasena = '';
$base_de_datos = 'deudas_cero';

$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

if ($conexion->connect_error) {
    die('Error de conexion: ' . $conexion->connect_error);
}
?>
