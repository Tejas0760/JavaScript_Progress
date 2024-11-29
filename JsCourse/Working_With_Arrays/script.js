'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];
  
  /////////////////////////////////////////////////
  // Elements
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');
  
  /////////////////////////////////////////////////
  // Functions
  
  const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';
  
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  
    movs.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
  
      const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
      `;
  
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  };
  
  const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
  };
  
  const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;
  
    const out = acc.movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;
  
    const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        // console.log(arr);
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
  };
  
  const createUsernames = function (accs) {
    accs.forEach(function (acc) {
      acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
  };
  createUsernames(accounts);
  
  const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);
  
    // Display balance
    calcDisplayBalance(acc);
  
    // Display summary
    calcDisplaySummary(acc);
  };
  
  ///////////////////////////////////////
  // Event handlers
  let currentAccount;
  
  btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();
  
    currentAccount = accounts.find(
      acc => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);
  
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      // Display UI and message
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 100;
  
      // Clear input fields
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();
  
      // Update UI
      updateUI(currentAccount);
    }
  });
  
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';
  
    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
  
      // Update UI
      updateUI(currentAccount);
    }
  });
  
  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
  
    const amount = Number(inputLoanAmount.value);
  
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
      // Add movement
      currentAccount.movements.push(amount);
  
      // Update UI
      updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
  });
  
  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
  
    if (
      inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );
      console.log(index);
      // .indexOf(23)
  
      // Delete account
      accounts.splice(index, 1);
  
      // Hide UI
      containerApp.style.opacity = 0;
    }
  
    inputCloseUsername.value = inputClosePin.value = '';
  });
  
  let sorted = false;
  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
  });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////


// SLICE
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2, 4));

//Slice wont make changes in the actual array

console.log(arr);
console.log(arr.slice(2));
console.log(arr.slice(-1));
console.log(arr.slice(-3,-1));
console.log(arr.slice());
console.log([...arr]);


//SPLICE
let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.splice(1,3));
console.log(arr2);

//Similar to slice but makes changes to the actuall array


//CONCAT
console.log(arr.concat(arr2))

console.log([...arr, ...arr2]);
*/


///////////////////////////////////////
// Looping Arrays: forEach
//////////////////////////////////////
/*
const transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];

// The Main Difference in a normal "for of" and a "forEach" loop is that you can't break out of a normal foreach loop if you want to break out of the loop at some time then you should prefer to use a noraml "For of" loop instead of a "forEach" loop

for(const value of transactions){
    if(value>0){
        console.log(`you account is credited by ${value}`);
    }
    else{
        console.log(`you account is debited by ${Math.abs(value)}`);
    }
};

console.log(`-------- SPLIT HERE ---------`);
// A high order function getting called by a lower order function 
transactions.forEach(function(val, idx, arr){
    if(val > 0){
        console.log(`Your account is credited by ${val}`)
    }
    else{
        console.log(`Your account is debited by ${Math.abs(val)}`)
    }
});
*/


///////////////////////////////////////
// forEach With Maps and Sets
// Map
/*
const currency = new Map([
    ['USD', 'United states dollar'],
    ['GSP', 'Pound Sterling'],
    ['EUR', 'Euros'],
]);

currency.forEach(function(val, key, map){
    console.log(`${key}: ${val}`)
});

//SET
const currency2 = new Set(['USD', 'GSP', 'USD', 'EUR', 'EUR']);

currency2.forEach(function(val, _, set){
    console.log(`${val}: ${val}`)
})
*/


//////////////////////////////////////////
/////// MAP METHOD FOR ARRAYS (to operate on each and every one element present in an array)
/////////////////////////////////////////
/*
const Usd_to_Inr = movements.map(function (value){
    return value * 84;
})

const Usd_to_Inr_2 = movements.map(value => value * 84); 

const Usd_to_Inr_3 = movements.map(
    (value, i) => 
    `You ${value > 0 ? 'Deposited' : 'Withdrew'} ${value} Dollars`
)

console.log(movements);
console.log(Usd_to_Inr);
console.log(Usd_to_Inr_2);
console.log(Usd_to_Inr_3);
*/

///////////////////////////////////////
// The filter Method  (To filter out specific values in an array according to a condition) (This Method Returns a Boolean Value So Make sure you remeber that)
//////////////////////////////////////
/*
const deposits = movements.filter(function(val){
    return val > 0;
})
console.log(deposits);

const withdraws = movements.filter(function(val){
    return val < 0;
})
console.log(withdraws);

const deposits_2 = movements.filter(val => val > 0);
console.log(deposits_2);

const depositsfor = [];
for(const val of movements){
    if(val > 0){
        depositsfor.push(val);
    }
}
console.log(depositsfor);
*/

///////////////////////////////////////
// The reduce Method (TO get a single value out of an array by performing an action on each an every element present in an array) (look into the format on mdn references)
//////////////////////////////////////
/*
const balance = movements.reduce( function(acc, cur, i , arr){
    console.log(`Iteration ${i+1}: ${acc}`);
    return acc + cur;
}, 0);
console.log(balance);

const balance_2 = movements.reduce( (acc,cur) => acc + cur, 0);
console.log(balance_2);

let accBalance = 0;
for(const mov of movements) accBalance += mov;
console.log(accBalance);


//Maximum Balance 
const maxBalance = movements.reduce(
    (acc,cur) => {
        if(acc > cur){
            return acc;
        }
        else{
            return cur;
        }
    }
, movements[0]);
console.log(maxBalance);
*/




///////////////////////////////////////
// The Magic of Chaining Methods
///////////////////////////////////////

/*
const eurToUsd = 1.1;
console.log(movements);

const totalDepositUSD = movements
    .filter(val => val > 0)
    .map((mov, i , arr) => mov * eurToUsd)
    .reduce((acc, cur, i ,arr) => acc + cur, 0);

console.log(Math.trunc(totalDepositUSD));
*/




/////////////////////////////////////
///// FIND METHOD (pretty much similar to the filter method in array the main difference between the two is 1:THE First: that in find method it will return the first occurance of the value unlike the filter method which give all the occurances, 2 THE Second: difference is that it will actually give you the value unlike the filter method which will give you a new array of all the occurance fullfiling the value of that condition)
////////////////////////////////////
/*
console.log(movements);

const firstDeposit = movements.find(val => val > 0);
console.log(firstDeposit);
const firstWithdrawal = movements.find(val => val < 0);
console.log(firstWithdrawal);

const findJessi = accounts.find(val => val.owner === 'Jessica Davis')
console.log(findJessi);
*/



///////////////////////////////////////
// some and every
/*
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/


