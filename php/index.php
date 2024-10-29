<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Prueba PHP</title>
</head>

<body>
    <p>Este es un ejemplo de PHP</p>
<?phpr
for ($i = 0; $i < 10; $i++) 
    //echo "<p>Hola mundo!! $i</p>";
    //para que salga el dolar se pone delante \
    eco <<<heredoc
    <p>Hola mundo!! \$i</p>
//tiene que estar en la primera columna
heredoc;
?>
<li>Nombre: <strong><?=$_POST["nombre"];?></strong></li> //input
</body>
</html>