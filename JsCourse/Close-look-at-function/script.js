'use strict'

/*
const bookings = [];

const booking = function(flighName, passengerNumber = 1, priceOfSeat = 199 * passengerNumber){

    const info = {
        flighName,
        passengerNumber,
        priceOfSeat,
    };

    console.log(info);
    bookings.push(info);
}

booking('LH123');
booking('LH123',3);
booking('LH123', 5 ,6);
booking('LH123', undefined ,6);
*/

//parsing arguments and manipulation an object 

/*
const flight = 'LH168';
const tejas = {
    name: 'Tejas Choudhary',
    passport: 39
};

const bookFlight = function(flightNum, passenger){
    flightNum = 'LH169',
    passenger = 'Mr' + passenger.name;

    if(passenger.passport === 39){
        alert('Checked In');
    }
    else{
        alert('Wrong Passport number');
    }
}

console.log(flight, tejas.name, tejas.passport);
bookFlight(flight,tejas);
*/

//Look ino first class fucntions as well as high level functions



//////////////////////////////////////////
// Functions Accepting Callback Functions //
//////////////////////////////////////////

/*
const onewordfunction = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

// const answer = onewordfunction("JavaScript is nice but a little bit complex");
// console.log(answer);

const firstWordCapital = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' '); 
}

// const answer = firstWordCapital("javascript is kinda shit not gonna lie");
// console.log(answer);


//HIgh Level Function 
const transform = function(str, fn){
    console.log(`Original Script: ${str}`);
    console.log(`The called function is ${fn.name}`);

    console.log(`Transformed String: ${fn(str)}`);
}

// transform('JavaScript is the best!', firstWordCapital);
// transform('JavaScript is the best!', onewordfunction);


// JS uses callbacks all the time
const high5 = function () {
    console.log('👋');
  };
  document.body.addEventListener('click', high5);
  ['Jonas', 'Martha', 'Adam'].forEach(high5);

*/

///////////////////////////////////////
// Functions Returning Functions
//////////////////////////////////////

/*
const greet = function (greeting) {
    return function (name) {
      console.log(`${greeting} ${name}`);
    };
  };
  
  const greeterHey = greet('Hey');
  greeterHey('Tejas');
  greeterHey('John');
  
  greet('Hello')('Tejas');
  
  // Challenge
  const greetArr = greeting => name => console.log(`${greeting} ${name}`);
  
  greetArr('Hi')('John');
*/

///////////////////////////////////////
// The call and apply Methods
//////////////////////////////////////

/*
const airindia = {
    name: 'AirIndia',
    iatacode: 'AI',
    bookings: [],

    book(flightNum, name, seat){
        console.log(`${name} Booked a fight on ${this.name} ${this.iatacode}:${flightNum} and the seat is ${seat}`);
        this.bookings.push(`flight: ${this.iatacode}${flightNum} seat: ${seat}`, name);
    }
};


airindia.book(421, 'Tejas', 'window');
console.log(airindia);

const book = airindia.book;

//Will NOT Work and gives undefined
// book(542,'John',"center");

book.call(airindia, 543, "preeti", "aile");
console.log(airindia);

const airasia = {
    name: 'Air Asia',
    iatacode: 'AA',
    bookings: [],
};

book.call(airasia, 123, 'Luffy', 'Window');
console.log(airasia)
*/




///////////////////////////////////////
// The bind Method
//////////////////////////////////////


//lets say you have a list of objects and in that you want to call a particular one for using the "this" then in that  case you can use bind and partial declare the object before using it

/*
const airasia = {
    name: 'Air Asia',
    iatacode: 'AA',
    bookings: [],

    book(flightNum, name, seat){
        console.log(`${name} Booked a fight on ${this.name} ${this.iatacode}:${flightNum} and the seat is ${seat}`);
        this.bookings.push(`flight: ${this.iatacode}${flightNum} seat: ${seat}`, name);
    }
};

const swiss = {
    name: 'Swiss Airlines',
    iatacode: 'SA',
    bookings: [],
};

const sweden = {
    name: 'Suka Biliat',
    iatacode: 'SB',
    bookings: [],
};

const book = airasia.book;

const bookSwiss =  book.bind(swiss);
const bookairasia =  book.bind(airasia);
const bookSweden =  book.bind(sweden);

bookSweden(412, 'John Sweden', 'Middle');
bookSwiss(231, 'John Swiss', 'Center');
bookairasia(817, 'Johnny Paji','Aile');

console.log(sweden);
console.log(swiss);
console.log(airasia);

//can also bind with other value also but ******* THE SEQUENCE SHOULD BE THE SAME AS THE OBJECT *****

const bookSwiss231 = book.bind(swiss, 231);
bookSwiss231('John Swiss Brother', "Window");
console.log(swiss);



//With Event Listener
airasia.planes = 65;
airasia.buyplane = function(){
    //helps us see which object is being called
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

// airasia.buyplane()
//This one will call the button of buy itself due to the "this" keyword as it is not binded to the object d
// document.querySelector('.buy').addEventListener('click', airasia.buyplane);
document.querySelector('.buy').addEventListener('click', airasia.buyplane.bind(airasia));


// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/


