'use strict';

let title;
let screens;
let screenPrice;
let rollback = 50;
let adaptive;
let service1;
let service2;
let price;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};


const getTitle = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки').trim();
  title = title[0].toUpperCase() + title.slice(1).toLowerCase();

  return title;
};


const getQuestion = function () {
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные'
  );
  screenPrice = prompt('Сколько будет стоить данная работа?');

  while (!isNumber(screenPrice) || screenPrice === '0' || screenPrice === null) {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  }

  screenPrice = screenPrice.trim(); 

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
  return console.log(`Значение ${variable} - ${typeof variable}`);
};

function getAllServicePrices() {
  let sum = 0;
  let i = 0;
  do {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    price = prompt('Сколько это будет стоить?');

    while (!isNumber(price) || price === '0' || price === null) {
      price = prompt('Сколько это будет стоить?');
    }

    price = price.trim();
    sum += +price;
    i++;
  } while (i < 2);

  return sum;
}

const getFullPrice = function () {
  return +screenPrice + allServicePrices;
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - rollback);
};

const getRollbackMassage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price < 30000 && price > 15000) {
    return 'Даем скидку в 5%';
  } else if (price <= 15000 && price >= 0) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что то пошло не так';
  }
};

title = getTitle();
getQuestion();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(`allServicePrices - ${allServicePrices}`);
console.log(`Название сайта - ${title}`);
console.log(`Типы необходимых экранов - ${screens}`);
console.log(getRollbackMassage(fullPrice));
console.log(
  `Общая стоимость за вычетом отката посреднику - ${getServicePercentPrices()}`
);
