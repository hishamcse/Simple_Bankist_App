import { accounts, logo, labelBalance } from './script.js';

/*---------- Unnecessary Methods for this project. Just for practice -----------*/

logo.addEventListener('click', () => {                            // allover details of the bank
  const totalBankAmount = accounts.flatMap(acc => acc.movements)
    .reduce((sum, cur) => sum + cur);
  alert(`Bank Details:
         Bank Name: Personal Bankist
         Total Accounts: ${accounts.length}
         Total Amounts In the bank: ${totalBankAmount}`);
});

labelBalance.addEventListener('click', () => {                    // showing all transaction as alert
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
    el => (el.textContent));
  alert(`All transactions: ${movementsUI.join(' , ')}`);
});

labelBalance.addEventListener('click', () => {                   // changing color of rows
  document.querySelectorAll('.movements__row').forEach((el, i) => {
    if (i % 2 === 0) el.style.backgroundColor = '#C2EFEB';
    if (i % 3 === 0) el.style.backgroundColor = '#6EA4BF';
  });
});