"use strict"

//Функция для Появление
function addClasses(element, newClass) {
  document.querySelector(`.${element}`).classList.add(`${newClass}`);
}

function removeClasses(element, newClass) {
  document.querySelector(`.${element}`).classList.remove(`${newClass}`);
}

function toggleActiveClass(element) {
  console.log(element)
  document.querySelector(`.${element}`).classList.toggle("active");
}

//Обработчик отслеживает скролл
if(window.location.href === 'http://127.0.0.1:5500/') {
document.addEventListener('scroll', () => {
  let scrollTop = document.documentElement.scrollTop;
  console.log(scrollTop)
  if(scrollTop > 100) {
    addClasses("header__content", "active")
  }
  if(scrollTop < 100) {
    removeClasses("header__content", "active")
  }
}) 
}

// Если страница загрузилась

window.onload=function(){
  setTimeout(document.querySelector(".banner").classList.add("active"),2000)
}

function hideBanner() {
  document.querySelector(".banner").classList.remove("active")
}

//Функция для создания элементов 

function createElementHTML(tagName, parentClass, attributes) {

  let element = document.createElement(tagName);
  attributes.forEach(function (item, i, arr) {
    element.setAttribute(`${arr[i][0]}`, `${arr[i][1]}`)
  });
  let root = document.querySelector(`.${parentClass}`)
  root.append(element)
}

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