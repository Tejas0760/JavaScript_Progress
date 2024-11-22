'use strict';
/*
const person = function(firstName, birthYear){
    //Instance Propertie
    this.firstName = firstName,
    this.birthYear = birthYear

    //Never do this as this is gonna create as many copies as the number of objects making the code redundant and non efficient
    // this.calcAge = function(){
    //     console.log(2037 - this.birthAge);
    // }
};

const jack = new person('Jack', 1992);
const jones = new person('Jones', 1993);
const nick = new person('Nick', 1991);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

console.log(jack,jones,nick);
console.log(jack instanceof(person));

const jay = nick;
console.log(jay instanceof(person));


///////////////////////////////////////
// Prototypes
///////////////////////////////////////

person.prototype.calcAge = function(){
    console.log(2024 - this.birthYear)
}

jack.calcAge();
jones.calcAge();
nick.calcAge();

console.log(jack.__proto__);
console.log(jack.__proto__ === person.prototype);

console.log(person.prototype.isPrototypeOf(jack));
console.log(person.prototype.isPrototypeOf(nick));
console.log(person.prototype.isPrototypeOf(person));

person.prototype.species = 'Homo Sapiens';
console.log(jack.species, nick.species);

console.log(jack.hasOwnProperty('firstName'));
console.log(jack.hasOwnProperty('species'));




///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects


console.log(jack.__proto__);
// Object.prototype (top of prototype chain)
console.log(jack.__proto__.__proto__);
console.log(jack.__proto__.__proto__.__proto__);

console.dir(person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
*/