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
  countScreen: 0,
  screenPrice: 0,
  rollback: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  isError: false,

  init: function () {
    appData.addTitle();

    buttonStart.addEventListener('click', function (e) {
      e.preventDefault();

      appData.checkScreens();
    });

    buttonAdd.addEventListener('click', appData.addScreenBlock);

    appData.addRollback();   
  },

  checkScreens: function () {
    if (!appData.isError) {
      appData.start();
      console.log(appData.isError);
    } else {
      alert('Выберити тип экрана');
      appData.isError = false;
      console.log(appData.isError);
    }
  },

  start: function () {
    appData.addScreens();

    appData.addServices();

    appData.addPrice();

    appData.addRollback();

    console.log(appData.rollback);

    // appData.getServicePercentPrices();
    // appData.logger();

    appData.showResult();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  showResult: function () {
    inputTotal.value = appData.screenPrice;
    inputTotalCount.value = appData.countScreen;
    inputTotalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    inputTotalCountFull.value = appData.fullPrice;

    inputTotalCountRollback.value = appData.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, i) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      console.log(appData.isError);

      if (
        selectName === 'Тип экранов' ||
        input.value === 'Количество экранов' ||
        input.value.trim() === ''
      ) {
        appData.isError = true;
      }

      console.log(appData.isError);

      appData.screens.push({
        id: i,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
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

    appData.countScreen = appData.screens.reduce(function (sum, item) {
      return sum + +item.count;
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

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  addRollback: function () {
    inputRollback.addEventListener('input', function (e) {
      spanRollback.textContent = e.target.value;
      appData.rollback = spanRollback.textContent;
    });

    inputRollback.addEventListener('change', function (e) {
      appData.rollback = +e.target.value;
      appData.rollback = spanRollback.textContent;
      console.log(appData.rollback);
    });
  },

  logger: function () {
    console.log(`Название сайта - ${appData.title}`);
    console.log(`fullPrice - ${appData.fullPrice}`);
    console.log(
      `Общая стоимость за вычетом отката посреднику - ${appData.servicePercentPrice}`
    );
  },
};

appData.init();
