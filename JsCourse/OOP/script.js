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





////////////////////////////////////
////// Classes 
//////////////////////////////////

//class expression 
// const PersonCl = class {}

//class decleration 

/*
class PersonCl {
    //pass all the parameters you need in this constructor and make sure that it is named constructor only
    constructor(name, birthYr){
        this.name = name,
        this.birthYr = birthYr
    };

    // declare all your methos here now and it will be the same as declaring them as with the prototype syntax method 
    // Methods will be added to .prototype property

    calcAge() {
        console.log(2024 - this.birthYr);
    };

    greet(){
        console.log(`Hey ${this.name}, Hows you're day been so far`);
    };
};

const person1 = new PersonCl('tejas', 2000);
const person2 = new PersonCl('aniket', 1998);

console.log(person1, person2);

console.log(person1.__proto__ === PersonCl.prototype);

// Same as declaring this in the class(Played around with it and noticed that if both are present this will will override the one in the class)
// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.name}, Hows your day been so far`);
// };

person1.greet();
person2.greet();

// ******** IMP ***********
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

*/

////////////////////////////////////
// Getters and setters
///////////////////////////////////

class PersonCl {
    //pass all the parameters you need in this constructor and make sure that it is named constructor only
    constructor(fullName, birthYr){
        this.fullName = fullName,
        this.birthYr = birthYr
    };

    // Set a property that already exists
    set fullName(name){
        if(name.includes(' ')) this._fullName = name;
        else alert(`${this.name} is not a full name`);
    }

    get fullName(){
        return this._fullName;
    }

    // Static method
    //(not accessible to the methods using this as a prototype or parent class)
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const walter = new PersonCl('Walter White', 1965);
console.log(walter);


const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],
  
    get latest() {
      return this.movements.slice(-1).pop();
    },
  
    set latest(mov) {
      this.movements.push(mov);
    },
  };
  
  console.log(account.latest);
  
  account.latest = 50;
  console.log(account.movements);


//   PersonCl.hey();
//   walter.hey();



///////////////////////////////////////
// Object.create
///////////////////////////////////////

/*
const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },
  
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  
  const steven = Object.create(PersonProto);
  console.log(steven);
  steven.name = 'Steven';
  steven.birthYear = 2002;
  steven.calcAge();
  
  console.log(steven.__proto__ === PersonProto);
  
  const sarah = Object.create(PersonProto);
  sarah.init('Sarah', 1979);
  sarah.calcAge();
*/



///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions
/*
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };
  
  Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
  
  const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
  };
  
  // Linking prototypes
  Student.prototype = Object.create(Person.prototype);
  
  Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };
  
  const mike = new Student('Mike', 2020, 'Computer Science');
  mike.introduce();
  mike.calcAge();
  
  console.log(mike.__proto__);
  console.log(mike.__proto__.__proto__);
  
  console.log(mike instanceof Student);
  console.log(mike instanceof Person);
  console.log(mike instanceof Object);
  
  Student.prototype.constructor = Student;
  console.dir(Student.prototype.constructor);
*/