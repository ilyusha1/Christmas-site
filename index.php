<?php

//ФОРМИРОВАНИЕ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ
date_default_timezone_set('Europe/Moscow');
$time = date('m/d/Y h:i:s a', time());
if(isset($_SERVER['HTTP_REFERER'])) {
  $of = $_SERVER["HTTP_REFERER"];    
} else {
    $of = "Напрямую";
}
$ip = $_SERVER['REMOTE_ADDR'];
$host =  $_SERVER['HTTP_HOST'];
$visit = 1;
//SQL ПОДКЛЮЧЕНИЕ К БД
$dsn = 'mysql:host=localhost; dbname=easter'; //изменить dbname
$pdo = new PDO($dsn, 'root', 'robokop67');//изменить пароль

//SQL ПРОВЕРКА НА СУЩЕСТВОВАНИЕ IP В КУКИ. СЧИТАЕТ СКОЛЬКО ПОЛЬЗОВАТЕЛЬ ЗАХОДИЛ ТУДА СЮДА

$first_or_second = 0;
if (!isset($_COOKIE['ip'])) {
    setcookie("visit", $visit, time() + 604800);
    setcookie("ip", $ip, time() + 604800);
    $first_or_second = 1;
};

$stmt = $pdo->prepare('SELECT ip, visit FROM statistic WHERE ip = :ip'); 
if ($first_or_second == 1) { //Если только создался
    $stmt->execute(array('ip' => $ip));
} elseif ($first_or_second == 0) { //Если есть в куки
    $stmt->execute(array('ip' => $_COOKIE['ip']));
};

$row = $stmt->fetch();

if ($row['ip'] == "") {
    $sql = 'INSERT INTO statistic(host, ip, of, date, visit) VALUES(:host, :ip, :of, :date, :visit)';
    $query = $pdo->prepare($sql);
    $query->execute(['host' => $host, 'ip' => $ip, 'of' => $of, 'date' => $time, 'visit' => $visit]);
};

if ($row['ip'] != "") {
    $visit = $row['visit'];
    $visit += 1;
    $sql = "UPDATE statistic SET visit=:visit, date=:date WHERE ip=:ip";
    $query = $pdo->prepare($sql);
    $query->execute(['visit' => $visit, 'date' => $time, 'ip' => $row['ip']]);
}

?>

<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="ru"> <!--<![endif]-->

<head>
    <meta charset="utf-8">
    <title>Христиане Кропоткина</title>
    <meta name="description" content="">

    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">


    <link rel="shortcut icon" href="img/favicon/chmonoa.ico" type="image/x-icon">

    <link rel="apple-touch-icon" href="img/favicon/apple.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple114.png">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">

</head>
<body>

<div class="loader"></div>

<div class="mn-burger">
    <div class="mn-burger__button">
        <div class="mn-burger__container">
            <div class="mn-burger__line"></div>
        </div>
    </div>
</div>


<div class="vremenno title padding-all">Здравствуйте! Сайт на ПК версии временно не работает. Если возможно, то зайдите с телефона</div>

<div class="alert-height title padding-all">Пожалуйста, переверните телефон для корректной работы сайта</div>

<main class="header active-page" check-page="1" id="1"> <!-- По id сверяю атрибут нажимаемого дота и страницу-->

    <div class="header__content">
        <div class="header__column">

            <div class="header__section-1">
                <div class="header__grid-menu">
                    <nav class="menu__nav">
                        <a href="" class="menu__link title-menu">ГЛАВНАЯ САЙТА</a>
                        <a href="" class="menu__link title-menu">О НАС</a>
                        <a href="" class="menu__link title-menu">КОНТАКТЫ</a>
                    </nav>
                </div>
                <div class="header__intro">
                    <div class="header__dialog">
                        <div class="header__dialog-one title">ХРИСТОС ВОСКРЕС!</div>
                        <div class="header__dialog-two title">
                            ВОИСТИНУ ВОСКРЕС!
                        </div>
                    </div>
                    <div class="header__intro-content">
                        <div class="headre__title-pc title">ХРИСТОС ДЕЙСТВИТЕЛЬНО ВОСКРЕС!</div>
                        <div class="header__title title">Что значат Его смерть и воскресение? В чём суть этого праздника?</div>
                    </div>

                    <img src="img/jesus.webp" alt="">

                </div>
            </div>
        </div>
    </div> 
</main>

<main class="bible" check-page="2" id="2">
    <div class="bible__container">
        <div class="bible__column">
            <div class="bible__content padding-all">
                <div class="bible__title title">Пасха - это необычный праздник, потому что о нем написано в библии
                </div>
                <div class="bible__subtitle subtitle">
Мы доверяем библии, в ней написано:
“...Пасха наша, Христос...” <br>
(1 Коринфянам 5:7)

                </div>
            </div>
            <div class="bible__img">
                <img src="img/bible.webp" alt="bible on table">
            </div>
        </div>
    </div>
</main>

<main class="jesus" check-page="3" id="3">
    <div class="jesus__container">
        <div class="jesus__column">

            <div class="jesus__img">
                <img src="img/coffin.webp" alt="open coffin">
            </div>

            <div class="jesus__content padding-all">
                <div class="jesus__title title">
                    Христос сказал:
                </div>
                <div class="jesus__subtitle subtitle">
“Сыну Человеческому надлежит быть предану в руки человеков грешников, и быть распяту, и в третий день воскреснуть.” (Луки 24:7). Но люди с самого начала не верили Ему и хотели, чтобы весть о Его воскресении оказалась неправдой, но факты говорили обратное, Он реально ожил, Его могила пуста.
Это событие изменило жизни миллионов людей!</div>
            </div>

        </div>
    </div>
</main>

<main class="trust" check-page="4" id="4">
    <div class="trust__container">
        <div class="trust__column">

            <div class="trust__content padding-all">
                <div class="trust__title title">
                    Веришь ли ты в это?
                </div>
                <!-- <div class="trust__gradient padding-all"></div> -->
                <div class="trust__subtitle subtitle">Мы верим, что Иисус - это Сын Божий, который пришел ради того, чтобы решить самую большую проблему человечества, из-за которой в мире столько зла, боли и разочарования. Проблему греха, проблему потерянных отношений с Богом... Для этого Ему пришлось заплатить огромную цену, доказав Свою любовь к нам, отдав Свою жизнь, вместо нашей. Смерть на кресте оказалась платой за твой и мой грех. Но Его воскресение доказало, что у человечества есть надежда... Теперь у человека есть заступник - это Христос! <br>   </div>
            </div>

        </div>
    </div>
</main>

<main class="contacts" check-page="5" id="5">
    <div class="contacts__container">
        <div class="contacts__column">

            <div class="map">
                <button class="map__nav title padding-all" onclick="mapsOff()">
                    ЗАКРЫТЬ КАРТУ
                </button>
                <iframe src="" class="iframes"></iframe>
            </div>

            <div class="contacts__translation padding-all" style="height: 100%">
                <div class="contacts__contact">
                    <div class="contacts__contact-title title">Контакты:</div>
                    <a href="https://vk.com/krop_church" class="contacts__contact-subtitle subtitle">Церковь Вконтакте</a>
                    <a href="https://vk.com/youth_krop" class="contacts__contact-subtitle subtitle">Молодёжь Вконтакте</a>
                    <a href="https://instagram.com/life.hmk?igshid=17nzxk9itidq3" class="contacts__contact-subtitle subtitle">Молодёжь в instagram</a>
                </div>
            </div>

        </div>
    </div>
    <div class="contacts__container-pc">
        <div class="contacts__column-pc padding-all">
                <div class="contacts__contact">
                    <div class="contacts__contact-title title">Контакты:</div>
                    <a href="https://vk.com/krop_church" class="contacts__contact-subtitle subtitle">Церковь Вконтакте</a> </br>
                    <a href="https://vk.com/youth_krop" class="contacts__contact-subtitle subtitle">Молодёжь Вконтакте</a> </br>
                    <a href="https://instagram.com/life.hmk?igshid=17nzxk9itidq3" class="contacts__contact-subtitle subtitle">Молодёжь в instagram</a>
                </div>

        </div>
    </div>
</main>

<div class="background-video">
    <video src="img/good.mp4" autoplay="autoplay" loop="true" muted="mute"></video>
</div>

<div class="dot padding-all">
    <button class="dot__item dot__item_active" id="dot-1" onclick="dotsClick(this)" checkDot="1"><span class="title">1</span></button>
    <button class="dot__item" id="dot-2" onclick="dotsClick(this)" checkDot="2"><span class="title">2</span></button>
    <button class="dot__item" id="dot-3" onclick="dotsClick(this)" checkdot="3"><span class="title">3</span></button>
    <button class="dot__item" id="dot-4" onclick="dotsClick(this)" checkdot="4"><span class="title">4</span></button>
    <button class="dot__item" id="dot-5" onclick="dotsClick(this)" checkdot="5"><span class="title">5</span></button>
</div>

    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js"></script>
    <!-- JS -->
	<script src="js/common.js"></script>
</body>
</html>