'use strict';

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = function (str) {
  return isNaN(parseFloat(str));
};

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  rollback: 10,
  adaptive: true,
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  getTitle: function () {
    appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');

    while (!isString(appData.title) || appData.title.trim().length === 0) {
      appData.title = prompt(
        'Как называется ваш проект?',
        'Калькулятор верстки'
      );
    }

    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.slice(1).toLowerCase();

    // appData.title = appData.title;

    console.log(appData.title);
  },

  getQuestion: function () {
    for (let i = 0; i < 2; i++) {
      let price = 0;
      let name = prompt('Какие типы экранов нужно разработать?');

      while (!isString(name) || name.trim().length === 0) {
        name = prompt('Какие типы экранов нужно разработать?');
      }

      price = prompt('Сколько будет стоить данная работа?');

      while (!isNumber(price) || price === '0' || price === null) {
        price = prompt('Сколько будет стоить данная работа?');
      }
      price = price.trim();

      appData.screens.push({ id: i, name: name, price: price });
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    let i = 0;
    do {
      let price = 0;
      let name = prompt('Какой дополнительный тип услуги нужен?');

      while (!isString(name) || name.trim().length === 0) {
        name = prompt('Какой дополнительный тип услуги нужен?');
      }

      price = prompt('Сколько это будет стоить?');

      while (!isNumber(price) || price === '0' || price === null) {
        price = prompt('Сколько это будет стоить?');
      }

      price = price.trim();

      appData.services[`${name} ${i}`] = +price;

      i++;
    } while (i < 2);
  },

  addPrice: function () {
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }

    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + (+item.price);
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
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
    console.log(`Название сайта - ${appData.title}`);
    console.log(`fullPrice - ${appData.fullPrice}`);
    console.log(
      `Общая стоимость за вычетом отката посреднику - ${appData.servicePercentPrice}`
    );
  },

  start: function () {
    appData.getTitle();
    appData.getQuestion();
    appData.addPrice();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.logger();
  },
};

appData.start();
