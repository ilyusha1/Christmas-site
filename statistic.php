<?php

//SQL ПОДКЛЮЧЕНИЕ К БД
$dsn = 'mysql:host=localhost; dbname=easter'; //изменить dbname
$pdo = new PDO($dsn, 'root', 'robokop67');//изменить пароль

//SQL ЗАПРОС ПОЛУЧЕНИЕ ДАННЫХ
$stmt = $pdo->query("SELECT * FROM statistic");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statistic-easter</title>

    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="statistic">
        <div class="statistic__container padding-all">
            <div class="statistic__title">Статистика</div>
            <div class="statistic__block">
                <?php 
                    while ($row = $stmt->fetch()) {
                ?>
                <div class="statistic__text title">Время: <?= $row['date'] ?></br> ip: <?= $row['ip'] ?></br> host: <?= $row['host'] ?></br> откуда: <?= $row['of'] ?></br> Визитов: <?= $row['visit'] ?></div>
                <?php 
                    }
                ?>
            </div>
        </div>
    </div>
</body>
</html>
