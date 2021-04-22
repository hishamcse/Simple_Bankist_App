import {
  accounts, currentAccount, btnTransfer, inputTransferTo, inputTransferAmount,
  timer, assignTimer, convertCurrency, updateDisplay
} from './script.js';

btnTransfer.addEventListener('click', (event) => {
  event.preventDefault();

  const transferTo = inputTransferTo.value;
  const amount = +inputTransferAmount.value;
  inputTransferTo.value = inputTransferAmount.value = '';

  if (amount > 0 && amount <= currentAccount.balance) {
    const account = accounts.find(account => account.userName === transferTo);
    if (account !== undefined && account !== currentAccount) {
      currentAccount.movements.push(-amount);
      account.movements.push(convertCurrency(currentAccount.currency, account.currency, amount));
      const now = new Date();
      currentAccount.movementsDates.push(now.toISOString());
      account.movementsDates.push(now.toISOString());
      updateDisplay(currentAccount);
      clearInterval(timer);
      assignTimer();
    } else {
      alert('Sorry!!Please use valid info. Try again!!');
    }
  } else {
    alert('Sorry!!Please use valid info. Try again!!');
  }
});