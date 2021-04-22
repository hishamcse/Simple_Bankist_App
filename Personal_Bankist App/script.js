'use strict';

/*---------------- Main file with all necessary variables and helper functions ----------------*/

/*-------------------------------- Data ----------------------------------*/

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2021-04-14T23:36:17.929Z',
    '2021-04-20T10:51:36.790Z'
  ],
  currency: 'EUR',
  locale: 'pt-PT' // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-04-18T18:49:59.371Z',
    '2021-04-16T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US'
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2010-06-25T14:19:59.371Z',
    '2011-01-01T15:15:43.035Z',
    '2016-07-26T12:01:20.894Z',
    '2018-11-30T09:08:16.867Z',
    '2019-02-25T06:04:23.907Z',
    '2020-04-10T14:43:26.374Z',
    '2021-01-05T04:18:46.235Z',
    '2021-02-25T16:33:36.386Z'
  ],
  currency: 'DKK',
  locale: 'da-DK'
};

const account4 = {
  owner: 'Salah Mohammad',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2015-04-01T10:17:24.185Z',
    '2016-05-08T14:11:59.604Z',
    '2017-07-26T17:01:17.194Z',
    '2019-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z'
  ],
  currency: 'SYP',
  locale: 'syr-SY'    // for english
  // locale: 'ar-SY'        // for arabic
};

const accounts = [account1, account2, account3, account4];

/*------------------------------- Elements -----------------------------*/

// labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

// container
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

// buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

// user inputs
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// others
const logo = document.querySelector('.logo');

/*---------------------------- functionalities -----------------------------*/

const createUserNames = (accs) => {
  accs.forEach(acc =>
    acc.userName = acc.owner.toLowerCase().split(' ')
      .map(name => name[0]).join(''));
};
createUserNames(accounts);

/*----------------- Helper Methods & Variables ---------------*/

let currentAccount, timer;

const dateTimeOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const assignAccount = (account) => {                // needed only for LoginRequest.js. As we can't reassign any variable there
  currentAccount = account;
};

const assignTimer = () => {                        // As we can't reassign any variable at other files
  timer = LogoutTimer();
};

const formatTime = (time) => {
  // const hour = `${now.getHours()}`.padStart(2, '0');
  // const minute = `${now.getMinutes()}`.padStart(2, '0');
  // const second = `${now.getSeconds()}`.padStart(2, '0');
  // return `${hour}:${minute}:${second}`;
  return new Intl.DateTimeFormat(currentAccount.locale,
    { hour: dateTimeOptions.hour, minute: dateTimeOptions.minute }).format(time);          // using Intl API
};

const formatDateTime = (dateTime) => {
  // const day = `${now.getDate()}`.padStart(2, '0');
  // const month = `${now.getMonth() + 1}`.padStart(2, '0');
  // const year = now.getFullYear();
  // return `${day}/${month}/${year}, ${formatTime(now)}`;
  return new Intl.DateTimeFormat(currentAccount.locale, dateTimeOptions).format(dateTime);       // using Intl API
};

const formatMovementDateTime = (date) => {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const dayDiff = calcDaysPassed(date, new Date());

  if (dayDiff === 0) return `today, ${formatTime(date)}`;
  else if (dayDiff === 1) return `yesterday, ${formatTime(date)}`;
  else if (dayDiff <= 7) return `${dayDiff} days ago, ${formatTime(date)}`;
  else return formatDateTime(date);
};

const formatCurrency = (money) => {
  const currencyOptions = {
    style: 'currency',
    currency: currentAccount.currency
  };
  return new Intl.NumberFormat(currentAccount.locale, currencyOptions).format(money);
};

const convertCurrency = (from, to, currency) => {
  const conversionRates = {
    'USD': 1,
    'EUR': 0.83,   // 1 USD === 0.83 EUR
    'DKK': 6.18,
    'SYP': 2860
  };
  return currency * (conversionRates[to] / conversionRates[from]);
};

/*------------------------ Main Functions ----------------------------*/

const calcGrossBalance = (account) => {
  account.balance = account.movements.reduce((sum, movement) => sum + movement, 0);
  labelBalance.textContent = formatCurrency(account.balance);        // alternative -> labelBalance.textContent = `${account.balance.toFixed(2)}€`;
};

const displayMovements = (account, sort = false) => {
  containerMovements.innerHTML = '';
  const newMovements = sort === true ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  newMovements.forEach((amount, i) => {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const date = formatMovementDateTime(new Date(account.movementsDates[i]));
    const currency = formatCurrency(amount);

    const htmlElement = `
    <div class='movements__row'>
      <div class='movements__type movements__type--${type}'>${i + 1} ${type}</div>
      <div class='movements__date'>${date}</div>
      <div class='movements__value'>${currency}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', htmlElement);
  });
};

const calcSummary = (account) => {
  // const deposits = account.movements
  //   .filter(movement => movement > 0)
  //   .reduce((sum, movement) => sum + movement);
  // labelSumIn.textContent = formatCurrency(deposits);
  //
  // const withdrawals = account.movements
  //   .filter(movement => movement < 0)
  //   .reduce((sum, movement) => sum + movement);
  // labelSumOut.textContent = formatCurrency(Math.abs(withdrawals));
  //
  // const totalInterest = account.movements
  //   .filter(movement => movement > 0)
  //   .map(movement => (movement * account.interestRate) / 100)
  //   .filter((interest) => interest >= 1)
  //   .reduce((sum, amount) => sum + amount, 0);
  // labelSumInterest.textContent = formatCurrency(totalInterest);

  // alternative way (very short)
  const obj = account.movements.reduce((sumObj, cur) => {
    sumObj[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
    if (cur > 0) {
      let interest = (cur * account.interestRate) / 100;
      interest = (interest >= 1) ? interest : 0;
      sumObj['totalInterest'] += interest;
    }
    return sumObj;
  }, { deposits: 0, withdrawals: 0, totalInterest: 0 });

  labelSumIn.textContent = formatCurrency(obj.deposits);
  labelSumOut.textContent = formatCurrency(Math.abs(obj.withdrawals));
  labelSumInterest.textContent = formatCurrency(obj.totalInterest);
};

const updateDisplay = (account) => {
  labelDate.textContent = formatDateTime(new Date());           // or labelDate.textContent = new Date().toLocaleString();
  displayMovements(account);
  calcGrossBalance(account);
  calcSummary(account);
};

const LogoutTimer = () => {
  let start = 120;

  const timerFunc = () => {
    const minute = String(Math.trunc(start / 60)).padStart(2, '0');
    const second = String(Math.trunc(start % 60)).padStart(2, '0');

    labelTimer.textContent = `${minute}:${second}`;

    if (start === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    start--;
  };

  timerFunc();
  const timer = setInterval(timerFunc, 1000);
  return timer;
};

/*------------------------------ Event Handlers ----------------------------*/

// Login: LoginRequest.js
// Transfer: TransferRequest.js
// Loan: LoanRequest.js
// Sort All Transactions: TransactionSorter.js
// Close/Delete Account: CloseAccount.js
// Optional Functions (Just For Practice) : OptionalFunctions.js

/*------------------ Exporting for splitting up multiple files -----------------*/
// all will be included in the respective modules as const by default

export {
  accounts, containerApp, currentAccount, logo, timer,
  labelWelcome, labelBalance, assignAccount, assignTimer,
  btnLogin, btnTransfer, btnLoan, btnSort, btnClose,
  inputLoginUsername, inputLoginPin, inputTransferTo, inputTransferAmount,
  inputLoanAmount, inputCloseUsername, inputClosePin,
  convertCurrency, updateDisplay, displayMovements, LogoutTimer
};