import { currentAccount, btnSort, displayMovements } from './script.js';

let sorted = false;
btnSort.addEventListener('click', (event) => {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;                               // flip the sorting condition
});