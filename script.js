'use strict';

console.log('привет мир');

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', ('Простые, Сложные, Интерактивные'));
const screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
const rollback = 50;

const adaptiveNeed = prompt('Нужен ли адаптив на сайте?');
let adaptive = false;
if (adaptiveNeed == 'да') {
    adaptive = true;
}

console.log(adaptiveNeed);
console.log(adaptive);

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - rollback);

console.log(servicePercentPrice);
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(screenPrice + ' $');
console.log(screens.toLowerCase().split(' '));
console.log(fullPrice * (rollback/100));


if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');    
} else if (fullPrice < 30000 && fullPrice > 15000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice <= 15000 && fullPrice >= 0) {
    console.log('Скидка не предусмотрена');    
} else {
    console.log('Что то пошло не так');
}
