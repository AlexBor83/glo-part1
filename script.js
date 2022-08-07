'use strict';

// let title;
// let screens;
// let screenPrice;
// let rollback = 50;
// let adaptive;
// let service1;
// let service2;
// let price;
// let allServicePrices;
// let fullPrice;
// let servicePercentPrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  rollback: 50,
  adaptive: true,
  service1: '',
  service2: '',
  price: 0,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  getTitle: function () {
    appData.title = prompt(
      'Как называется ваш проект?',
      'Калькулятор верстки'
    ).trim();
    appData.title =
      appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase();

    return appData.title;
  },

  getQuestion: function () {
    appData.screens = prompt(
      'Какие типы экранов нужно разработать?',
      'Простые, Сложные, Интерактивные'
    );
    appData.screenPrice = prompt('Сколько будет стоить данная работа?');

    while (
      !isNumber(appData.screenPrice) ||
      appData.screenPrice === '0' ||
      appData.screenPrice === null
    ) {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?');
    }

    appData.screenPrice = appData.screenPrice.trim();

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  getAllServicePrices: function () {
    let sum = 0;
    let i = 0;
    do {
      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
      }

      appData.price = prompt('Сколько это будет стоить?');

      while (
        !isNumber(appData.price) ||
        appData.price === '0' ||
        appData.price === null
      ) {
        appData.price = prompt('Сколько это будет стоить?');
      }

      appData.price = appData.price.trim();
      sum += +appData.price;
      i++;
    } while (i < 2);

    return sum;
  },

  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    return Math.ceil(appData.fullPrice - appData.rollback);
  },

  getRollbackMassage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price < 30000 && price > 15000) {
      return 'Даем скидку в 5%';
    } else if (price <= 15000 && price >= 0) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что то пошло не так';
    }
  },

  logger: function () {
    console.log(`allServicePrices - ${appData.allServicePrices}`);
    console.log(`Название сайта - ${appData.title}`);
    console.log(`Типы необходимых экранов - ${appData.screens}`);
    console.log(
      `Общая стоимость за вычетом отката посреднику - ${appData.getServicePercentPrices()}`
    );
    for (let key in appData) {
      console.log('Ключ: ' + key + ' ' + 'Значение: ' + appData[key]);
    }
    
  },

  start: function () {
    appData.title = appData.getTitle();
    appData.getQuestion();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.logger();
  },
};

appData.start();
