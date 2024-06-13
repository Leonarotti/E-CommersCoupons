<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pruebas de API</title>
</head>
<body>
    <h1>Pruebas de API</h1>

    <form action="controllers/coupon/getCouponById.php" method="GET">
        <label for="id">ID de Cupón:</label>
        <input type="number" id="id" name="id" required>
        <br><br>
        <button type="submit">Obtener Cupón</button>
    </form>

    <div id="response">
        <?php
            if (isset($_GET['id'])) {
                include_once '/controllers/coupon/getCouponById.php';
            }
        ?>
    </div>
</body>
</html>
