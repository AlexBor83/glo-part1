'use strict';

let title;
const screens = prompt(
  'Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'
);
const screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
const rollback = 50;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice;
let servicePercentPrice;

const showTypeOf = function (variable) {
  return console.log(`Значение ${variable} - ${typeof variable}`);
};

function getAllServicePrices() {
  return servicePrice1 + servicePrice2;
}

const allServicePrices = getAllServicePrices();


const getFullPrice = function () {
  return screenPrice + allServicePrices;
};

fullPrice = getFullPrice();


const getTitle = function () {
    title = prompt('Как называется ваш проект?').trim();
    title = title[0].toUpperCase() + title.slice(1).toLowerCase();

    return title;
};

title = getTitle();


const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - rollback);
};

servicePercentPrice = getServicePercentPrices();


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

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(`Название сайта - ${title}`);
console.log(`Типы необходимых экранов - ${screens}`);
console.log(getRollbackMassage(fullPrice));
console.log(`Общая стоимость за вычетом отката посреднику - ${getServicePercentPrices()}`);
