'use strict';

const title = document.getElementsByTagName('h1')[0];

let buttons = document.getElementsByClassName('handler_btn');
const buttonStart = buttons[0];
const buttonReset = buttons[1];

const buttonAdd = document.querySelector('.screen-btn');

const items = document.querySelectorAll('.other-items');
const itemsPercents = document.querySelectorAll('.other-items.percent');
const itemsNumbers = document.querySelectorAll('.other-items.number');

const inputRollback = document.querySelector('.rollback [type="range"]');
const spanRollback = document.querySelector('.rollback .range-value');

let inputs = document.querySelectorAll('.total-input');
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
    this.addTitle();
    this.checkScreens();

    buttonStart.addEventListener('click', (e) => {
      e.preventDefault();
      this.checkScreens();
    });

    buttonAdd.addEventListener('click', this.addScreenBlock);

    this.addRollback();
    this.reset();
  },

  checkScreens: function () {
    screens = document.querySelectorAll('.screen');
    this.isError = false;
    
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (input.value === '' || select.value.trim() === '') {
        this.isError = true;
      }
    });

    if (!this.isError) {
      this.start();
    } else {
      alert('Выберити тип и количество экранов');
    }
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrice();
    this.addRollback();    
    this.disabledInput();
    
    // appData.logger();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  showResult: function () {
    inputTotal.value = this.screenPrice;
    inputTotalCount.value = this.countScreen;
    inputTotalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    inputTotalCountFull.value = this.fullPrice;

    inputTotalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, i) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: i,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    console.log(this.screens);
  },

  addScreenBlock: function () {
    const cloneScreens = screens[0].cloneNode(true);
    screens = document.querySelectorAll('.screen');
    screens[screens.length - 1].after(cloneScreens);
  },

  addServices: function () {
    itemsPercents.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumbers.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrice: function () {
    this.screenPrice = this.screens.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    this.countScreen = this.screens.reduce((sum, item) => {
      return sum + item.count;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
  },

  addRollback: function () {
    inputRollback.addEventListener('input', (e) => {
      spanRollback.textContent = e.target.value;
      this.rollback = spanRollback.textContent;
    });

    inputRollback.addEventListener('change', (e) => {
      this.rollback = +e.target.value;
      this.rollback = spanRollback.textContent;
    });

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );

    this.showResult();
  },

  disabledInput: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      select.disabled = true;
      input.disabled = true;
    });

    items.forEach((item) => {
      const inputCheak = item.querySelector(' input[type="checkbox"]');

      inputCheak.disabled = true;
    });

    buttonAdd.disabled = true;
    inputRollback.disabled = true;

    buttonStart.style.display = 'none';
    buttonReset.style.display = 'flex';
  },

  reset: function () {
    buttonReset.addEventListener('click', () => {
      
      buttonStart.style.display = 'flex';
      buttonReset.style.display = 'none';
      buttonAdd.disabled = false;
      inputRollback.disabled = false;

      this.activeInput();
      this.clearScreens();
    });
  },

  activeInput: function () {
    items.forEach((item) => {
      const inputCheak = item.querySelector(' input[type="checkbox"]');
      inputCheak.disabled = false;
      inputCheak.checked = false;
      
      inputs.forEach((input) => {
        input.value = 0;        
      });
    });
  },

  clearScreens: function () {
    this.screens = [];

    if (screens.length > 1) {
      console.log(screens);

      for (let i = screens.length - 1; i > 0; i--) {
        screens[i].remove();        
      }
    }

    const select = screens[0].querySelector('select');
    const input = screens[0].querySelector('input');

      select.disabled = false;
      select.value = '';
      input.disabled = false;
      input.value = '';

      inputRollback.value = 0;
      spanRollback.textContent = inputRollback.value;
  },

  logger: function () {
    console.log(`Название сайта - ${this.title}`);
    console.log(`fullPrice - ${this.fullPrice}`);
    console.log(
      `Общая стоимость за вычетом отката посреднику - ${this.servicePercentPrice}`
    );
  },
};

appData.init();
