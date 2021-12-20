"use strict"

//Появление карты

document.addEventListener('readystatechange', () => {

  if (document.readyState == "complete") {
    document.querySelector(".loader").style.opacity = "0"
    document.querySelector('.header__dialog-one').style.transform = "translate(0%, 0%)"
    document.querySelector('.header__dialog-two').style.transform = "translate(0%, 0%)"
  }

  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
  }, 600)

})

    // document.querySelector('.header__dialog-one').style.transform = "translate(0%, 0%)"
    // document.querySelector('.header__dialog-two').style.transform = "translate(0%, 0%)"

function mapsOn() {
  document.querySelector('.iframes').src = "https://www.google.com/maps/d/u/3/embed?mid=1KSy3RZsEJleAFM3IrftwP4SCmUbraZoB"
  document.querySelector('.map').classList.add('map_active')
  //document.querySelector('.iframes').src = ""
}

function mapsOff() {
  document.querySelector('.map').classList.remove('map_active')
  //document.querySelector('.iframes').src = ""
}


//Функция анимации скролла
let timeForScroll = 470; //Эта переменная отвечает за скорость перехода. Достаточно поменять значеие
let nextActivePg;
function scroll(nextPage) {
  if (rightLeft == false) { //Скролл вправо
    document.getElementById(`${activePage}`).style.clipPath = 'inset(0% 100% 0% 0%)'
    document.getElementById(`${nextPage}`).style.clipPath = 'inset(0% 0% 0% 100%)'
    //Кроссбраузерность для айфонов WEBKIT
    document.getElementById(`${activePage}`).style.WebkitClipPath = 'inset(0% 100% 0% 0%)'
    document.getElementById(`${nextPage}`).style.WebkitClipPath = 'inset(0% 0% 0% 100%)'
    //Кроссбраузерность для оперы вроде O WEBKIT
    document.getElementById(`${activePage}`).style.OClipPath = 'inset(0% 100% 0% 0%)'
    document.getElementById(`${nextPage}`).style.OClipPath = 'inset(0% 0% 0% 100%)'
  } else if (rightLeft == true) { //Скролл влево
    document.getElementById(`${activePage}`).style.clipPath = 'inset(0% 0% 0% 100%)'
    document.getElementById(`${nextPage}`).style.clipPath = 'inset(0% 100% 0% 0%)'
    //Кроссбраузерность для айфонов WEBKIT
    document.getElementById(`${activePage}`).style.WebkitClipPath = 'inset(0% 0% 0% 100%)'
    document.getElementById(`${nextPage}`).style.WebkitClipPath = 'inset(0% 100% 0% 0%)'
    //Кроссбраузерность для оперы вроде O WEBKIT
    document.getElementById(`${activePage}`).style.OClipPath = 'inset(0% 0% 0% 100%)'
    document.getElementById(`${nextPage}`).style.OClipPath = 'inset(0% 100% 0% 0%)'
  }
}


//Работа с dot
let freedom = true; //переменная делает переход свободным
let firstCheckDot = 1; //переменная для номера нынешнего дота
let secondCheckDot = 0; //переменная для номера дота, на который выполнится переход
let activePage;

function dotsClick(button) { //получаю кнопку this так сказать

if (freedom == true) { //Если процесс перехода не занят, то выполняется.

  //получу активную страницу и его id
  activePage = document.querySelector('.active-page').id
  //Определяет сторону, в которую происходид скролл
  firstCheckDot = document.querySelector('.dot__item_active').getAttribute('checkdot'); //Номер активного/нынешнего дота
  secondCheckDot = button.getAttribute('checkdot'); //Получаю номер дота на который выполнится переход. Для сравнения с настоящим дотом
  if (firstCheckDot > secondCheckDot) {
    rightLeft = true;
    scroll(secondCheckDot)
  } else {
    rightLeft = false;
    scroll(secondCheckDot)
  }

  //Меняю стили дота, меняю активную страницу
    document.querySelector('.dot__item_active').classList.remove('dot__item_active') //если у какого-то класса active, то удаляю его
    button.classList.add('dot__item_active') //добавляю active к нажатаму классу dot
    freedom = false;
    setTimeout(() => { //через - 0.5 секунд убираю active-page и добавляю
      freedom = true;
      document.querySelector('.active-page').classList.remove('active-page') // удаляю активный класс у page.
      document.getElementById(`${secondCheckDot}`).classList.add('active-page') // Добавляю активный класс к странице, у который совпадает id с нажимаемым дотом
    }, timeForScroll)
  }

  //Стили на страницах. Разные анимации
  if (secondCheckDot == 1) {
    document.querySelector('.header__dialog-one').style.transform = "translate(0%, 0%)"
    document.querySelector('.header__dialog-two').style.transform = "translate(0%, 0%)"
  } else if (secondCheckDot != 1) {
    document.querySelector('.header__dialog-one').style.transform = "translate(-100%, 0%)"
    document.querySelector('.header__dialog-two').style.transform = "translate(100%, 0%)"
  }

  // if (secondCheckDot == 2) {
  //   document.querySelector('.bible__img').style.transform = "translate(0%, 0%)"
  // } else if (secondCheckDot != 2) {
  //   document.querySelector('.bible__img').style.transform = "translate(100%, 0%)"
  // }
}

// Работа с тач скрином

let startx = 0
let dist = 0
let numScroll = 0;
let rightLeft = false;
let nextDot;

window.addEventListener('touchstart', function(e){
        let touchobj = e.changedTouches[0] // первая точка прикосновения
        startx = parseInt(touchobj.clientX) // положение точки касания по x, относительно левого края браузера
        console.log('Status: touchstart ClientX: ' + startx + 'px')
    }, false)
  
window.addEventListener('touchmove', function(e){
        let touchobj = e.changedTouches[0] // первая точка прикосновения для данного события
        let dist = parseInt(touchobj.clientX) - startx

    }, false)
window.addEventListener('touchend', function(e){
        let touchobj = e.changedTouches[0] // первая точка прикосновения для данного события
        let dist = parseInt(touchobj.clientX) - startx
        console.log('Событие: touchend Координаты точки x: ' + dist + 'px')

        if (dist < -40) { // определяет направление скролла. Вправо
          numScroll += 1;
          rightLeft = false;
        }

        if (dist > 40) { // определяет направление скролла. Влево
          numScroll += 1;
          rightLeft = true;
        }

        if (dist < -40 && numScroll === 1) { //скролл вправо

          //ниже - переход к нужной странице. Определяет настоящий дот и следующий дот
          nextDot = Number(document.querySelector('.dot__item_active').getAttribute('checkDot'))
          nextDot += 1;
          document.querySelector(`#dot-${nextDot}`).click();
          setTimeout(() => {
            numScroll = 0;
          }, 2000)
        }

        if (dist > 40 && numScroll === 1) { //скролл влево
          //ниже - переход к нужной странице. Определяет настоящий дот и следующий дот
          nextDot = Number(document.querySelector('.dot__item_active').getAttribute('checkDot'))
          nextDot -= 1;
          //Очистка/определяет скролл.
          document.querySelector(`#dot-${nextDot}`).click();
          setTimeout(() => {
            numScroll = 0;
          }, 2000)
        } 

        numScroll = 0;

    }, false)

// Таймер отсчёт для трансляции

// Берём элемент для вывода таймера
let timer_show = document.querySelector('.contacts__timer');
let timer_showPc = document.querySelector('.contacts__timer-pc');
// Функция для вычисления разности времени
function diffSubtract(date1, date2) {
    return date2 - date1;
}
 
// Массив данных о времени
let end_date = {
    "full_year": "2021", // Год
    "month": "05", // Номер месяца
    "day": "02", // День
    "hours": "10", // Час
    "minutes": "00", // Минуты
    "seconds": "00" // Секунды
}
 
// Строка для вывода времени
let end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;

// Запуск интервала таймера
let timer = setInterval(function () {
    // Получение времени сейчас
    let now = new Date();
    // Получение заданного времени
    let date = new Date(end_date_str);
    // Вычисление разницы времени 
    let ms_left = diffSubtract(now, date);
    // Если разница времени меньше или равна нулю 
    if (ms_left <= 0) { // То
        // Выключаем интервал
        clearInterval(timer);
    } else { // Иначе
        // Получаем время зависимую от разницы
        let res = new Date(ms_left);
        // Делаем строку для вывода
        let days = res.getUTCDate() - 1
        let hours = res.getUTCHours()
        let minuts = res.getUTCMinutes()
        let tDays;
        let tHours;
        let tMinuts;
        //правильно склоняю дни
        if (days == 1) {
          tDays = "день"
        } else if (days == 2 || days == 3 || days == 4) {
          tDays = "дня"
        } else {
          tDays = "дней"
        }
        //правильно склоняю часы
        if (hours == 1 || hours == 21) {
          tHours = "час"
        } else if (hours == 2 || hours == 3 || hours == 4 || hours == 22 || hours == 23 || hours == 24) {
          tHours = "часа"
        } else {
          tHours = "часов"
        }
        //правильно склоняю минуты
        if (minuts == 1 || minuts == 21 || minuts == 31 || minuts == 41 || minuts == 51) {
          tMinuts = "минута"
        } else if (minuts == 2 || minuts == 3 || minuts == 4 || minuts == 22 || minuts == 23 || minuts == 24 || minuts == 32 || minuts == 33 || minuts == 34 || minuts == 42 || minuts == 43 || minuts == 44 || minuts == 52 || minuts == 53 || minuts == 54) {
          tMinuts = "минуты"
        } else {
          tMinuts = "минут"
        }

        let str_timer = `${days} ${tDays}, ${hours} ${tHours}, ${minuts} ${tMinuts}`;
        // Выводим время
        timer_show.innerHTML = str_timer;
        timer_showPc.innerHTML = str_timer;
    }
}, 1000)