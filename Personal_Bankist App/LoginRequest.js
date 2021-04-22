import {
  accounts, containerApp, currentAccount, labelWelcome, btnLogin,
  inputLoginUsername, inputLoginPin, timer,
  assignTimer, assignAccount, updateDisplay
} from './script.js';

btnLogin.addEventListener('click', (event) => {
  event.preventDefault();

  const user = inputLoginUsername.value;
  const password = inputLoginPin.value;
  const account = accounts.find(account => account.userName === user && account.pin === +password);     // as '+' will do type conversion automatically

  if (account !== undefined) {
    containerApp.style.opacity = 100;                                // make visible
    assignAccount(account);                                          // currentAccount = account
    inputLoginUsername.value = inputLoginPin.value = '';             // empty field
    inputLoginPin.blur();                                            // loosing focus
    labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}`;
    if (timer) clearInterval(timer);
    assignTimer();                                                   // timer = LogOutTimer();
    updateDisplay(currentAccount);                                   // updating the UI
  } else {
    alert('Sorry!!Please use correct info. Try again!!');
  }
});