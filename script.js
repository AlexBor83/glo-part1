'use strict';

console.log('привет мир');

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', ('Простые, Сложные, Интерактивные'));
const screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
const rollback = 50;

const adaptive = confirm('Нужен ли адаптив на сайте?');


console.log(`Булевое значение переменной adaptive - ${adaptive}`);

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - rollback);

console.log(`Итоговая стоимость за вычетом отката посреднику ${servicePercentPrice}`);
console.log(`Тип переменной title - ${typeof title}`);
console.log(`Тип переменной fullPrice - ${typeof fullPrice}`);
console.log(`Тип переменной adaptive - ${typeof adaptive}`);
console.log(`длинна строки screens - ${screens.length}`);
console.log(`Стоимость сайта без доп услуг - ${screenPrice} $`);
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
