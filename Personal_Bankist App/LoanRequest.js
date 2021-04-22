import { currentAccount, btnLoan, inputLoanAmount, timer, assignTimer, updateDisplay } from './script.js';

btnLoan.addEventListener('click', (event) => {
  event.preventDefault();

  const requestedAmount = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = '';
  if (requestedAmount > 0 && currentAccount.movements.some(movement => movement >= requestedAmount * 0.1)) {
    setTimeout(() => {                   // as bank needs processing time
      currentAccount.movements.push(requestedAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateDisplay(currentAccount);
      clearInterval(timer);
      assignTimer();
    }, 1500);
  } else {
    alert('Sorry!!Please use valid info. Try again!!');
  }
});