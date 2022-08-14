'use strict';

const title = document.getElementsByTagName('h1')[0];

let buttons = document.getElementsByClassName('handler_btn');
const buttonStart = buttons[0];
const buttonReset = buttons[1];

const buttonAdd = document.querySelector('.screen-btn');

const itemsPercents = document.querySelectorAll('.other-items.percent');
const itemsNumbers = document.querySelectorAll('.other-items.number');

const inputRollback = document.querySelector('.rollback [type="range"]');
const spanRollback = document.querySelector('.rollback .range-value');

let inputs = document.getElementsByClassName('total-input');
const inputTotal = inputs[0];
const inputTotalCount = inputs[1];
const inputTotalCountOther = inputs[2];
const inputTotalCountFull = inputs[3];
const inputTotalCountRollback = inputs[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  rollback: 10,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  init: function () {
    appData.addTitle();

    buttonStart.addEventListener('click', appData.start);

    buttonAdd.addEventListener('click', appData.addScreenBlock);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  showResult: function () {
    inputTotal.value = appData.screenPrice;
    inputTotalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    inputTotalCountFull.value = appData.fullPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, i) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: i,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens);
  },

  addScreenBlock: function () {
    const cloneScreens = screens[0].cloneNode(true);
    screens = document.querySelectorAll('.screen');
    screens[screens.length - 1].after(cloneScreens);
  },

  addServices: function () {
    itemsPercents.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumbers.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrice: function () {
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }

    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + +item.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;
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
    console.log('start');
    appData.addScreens();
    appData.addServices();

    appData.addPrice();

    // appData.getServicePercentPrices();
    // appData.logger();

    appData.showResult();
  },
};

appData.init();
