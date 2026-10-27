<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta DB - Inner Rise</title>
    <style type="text/css">
      table {
        border: solid 2px #7e7c7c;
        border-collapse: collapse;
        width: 90%;
        margin: 20px auto;
      }
     
      th, h1 {
        background-color: #edf797;
      }

      td, th {
        border: solid 1px #7e7c7c;
        padding: 6px;
        text-align: center;
      }

      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
    </style>
</head>
<body>

<?php
// Validamos datos del servidor
$user = "root";
$pass = "";
$host = "localhost";

// Conectamos a la base de datos
$connection = mysqli_connect($host, $user, $pass);

// Hacemos llamado a los inputs del formulario
$nombre = $_POST["name"] ?? "";
$apellido = $_POST["lastname"] ?? "";
$edad = $_POST["age"] ?? "";
$descripcion = $_POST["description"] ?? "";
$grado = $_POST["study"] ?? "";
$genero = $_POST["gender"] ?? "";
$calificacion = $_POST["number"] ?? "";

// Verificamos la conexión a la base de datos
if (!$connection) {
    echo "No se ha podido conectar con el servidor: " . mysqli_connect_error();
} else {
    echo "<b><h3>Hemos conectado al servidor</h3></b>";
}

// Indicamos el nombre de la base de datos
$datab = "inner_rise";

// Indicamos seleccionar la base de datos
$db = mysqli_select_db($connection, $datab);

if (!$db) {
    echo "No se ha podido encontrar la base de datos";
} else {
    echo "<h3>Base de datos seleccionada correctamente</h3>";
}

// Insertamos datos de registro indicando la tabla opiniones y sus atributos
$instruccion_SQL = "INSERT INTO opiniones (nombre, apellido, edad, descripcion, grado, genero, calificacion)
                     VALUES ('$nombre', '$apellido', '$edad', '$descripcion', '$grado', '$genero', '$calificacion')";
                   
$resultado = mysqli_query($connection, $instruccion_SQL);

if ($resultado) {
    echo "<h2>¡Opinión guardada correctamente!</h2>";
} else {
    echo "Error al guardar: " . mysqli_error($connection);
}

// Consultamos todos los registros para mostrarlos en la tabla
$consulta = "SELECT * FROM opiniones";
$result = mysqli_query($connection, $consulta);

if (!$result) {
    echo "No se ha podido realizar la consulta";
}

echo "<table>";
echo "<tr>";
echo "<th>ID</th>";
echo "<th>Nombre</th>";
echo "<th>Apellido</th>";
echo "<th>Edad</th>";
echo "<th>Opinión</th>";
echo "<th>Grado</th>";
echo "<th>Género</th>";
echo "<th>Calificación</th>";
echo "</tr>";

while ($colum = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $colum['id'] . "</td>";
    echo "<td>" . $colum['nombre'] . "</td>";
    echo "<td>" . $colum['apellido'] . "</td>";
    echo "<td>" . $colum['edad'] . "</td>";
    echo "<td>" . $colum['descripcion'] . "</td>";
    echo "<td>" . $colum['grado'] . "</td>";
    echo "<td>" . $colum['genero'] . "</td>";
    echo "<td>" . $colum['calificacion'] . "</td>";
    echo "</tr>";
}
echo "</table>";

mysqli_close($connection);

echo '<br><a href="contacto.html">Volver Atrás</a>';
?>

</body>
</html>