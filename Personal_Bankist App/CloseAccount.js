import {
  accounts, containerApp, currentAccount, labelWelcome, btnClose, inputClosePin, inputCloseUsername
} from './script.js';

btnClose.addEventListener('click', (event) => {
  event.preventDefault();

  const user = inputCloseUsername.value;
  const password = inputClosePin.value;
  const account = accounts.find(account => account.userName === user && account.pin === +password);
  inputCloseUsername.value = inputClosePin.value = '';

  if (account !== undefined && account === currentAccount) {
    containerApp.style.opacity = 0;
    const index = accounts.findIndex(acc => acc === account);
    accounts.splice(index, 1);
    labelWelcome.textContent = `Good day, ${account.owner.split(' ')[0]}`;
  } else {
    alert('Sorry!!Please use valid info. Try again!!');
  }
});