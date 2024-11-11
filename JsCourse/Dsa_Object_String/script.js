'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
      [week[3]]: {
        open: 12,
        close: 22,
      },
      fri: {
          open: 11,
          close: 23,
      },
      sat: {
          open: 0, // Open 24 hours
          close: 24,
      },
  }

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

    order(StartIndex, MainIndex){
        return [this.starterMenu.StartIndex], [this.mainMenu.MainIndex];
    },

    orderMessage({usr, startingIndex = 0, location, time = '12 hr from now'}){
        console.log(`Hii ${usr}, Your Order for ${this.starterMenu[startingIndex]}, has been despatched for ${location} and will reach you till ${time}`);
    }

};

// console.log(restaurant.name, restaurant.location, restaurant.mainMenu);

//deconstructing an object outside and then passing itinto a function inside the object 
restaurant.orderMessage({
    usr: 'Patrick',
    startingIndex: 2,
    location: 'Uttar Pradesh',
    time: '12:00',
});

restaurant.orderMessage({
    usr: 'SpongeBob',
    location: 'Bikini Bottom',
});


const {
    name,
    // location,
    // openingHours,
    mainMenu,
} = restaurant;

console.log(name ,openingHours, mainMenu);

const {
    name: restaurantName,
    openingHours: hours,
    location: address,
} = restaurant;

console.log(restaurantName, hours, address);

const { menu = [], starterMenu : starter=[]} = restaurant;
console.log(menu, starter);


//nested objects
const {sat: {open : o, close : c}} = openingHours;
console.log(o, c);