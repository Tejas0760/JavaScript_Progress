'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(data, className = ''){
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data[0].flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data[0].name.common}</h3>
        <h4 class="country__region">${data[0].region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data[0].population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${Object.entries(data[0].languages)
            .map(([code, language]) => `${code.toUpperCase()}: ${language}`)
            .join(`, `)}</p>
        <p class="country__row"><span>💰</span>${Object.entries(data[0].currencies).map(([code, { name, symbol }]) => `${code}: ${name} (${symbol})`).join(', ')}</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity =  1;
}

const getJSON = function (url, errorMsg = 'Country not found') {
    return fetch(url).then(response => {
        console.log(response.ok);
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };
/*
const getCountryData = function (country) {
    //first AJAX call
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      //render the main intital country 
      renderCountry(data);


          //////////////////////////////////////////////
            ///// Now Lets include the neighbours 
          /////////////////////////////////////////////


      //now get the neighbouring country
      const [neighbour] = data.borders;

      //gaurd clause
      if (!neighbour) return;

      //Make the second AJax call 
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function() {
        const data2 = JSON.parse(this.responseText);
        console.log(data2);

        renderCountry(data2, 'neighbour');
      })


    });
  };

  getCountryData('india');
*/


//Lets first learn about ajax calls (and what is the famous call back hell)
// ********** One way to identify this is through this rectanguar shape this gets gets 
// Other Ajax call will not exectue until unlees the previuos one has not finished executing
//  setTimeout(() => {
//     console.log('1 sec has passed');
//     setTimeout(() => {
//         console.log('2sec has passed');
//         setTimeout(() => {
//             console.log('3sec has passed');
//             setTimeout(()=> {
//                 console.log('4 sec has passed');
//             }, 1000);
//         }, 1000);
//     }, 1000);
//  }, 1000);





////////////////////////////////////////////
// Promises and fetch
///////////////////////////////////////////


/*
const getCountryAndNeighbour = function(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            if(!response.ok) throw new Error(`Country not found (${response.status})`);
            
            return response.json()})
        .then(data => {
            renderCountry(data);
            // console.log(data[0].flags.png)
            //get neighbour
            const data2 = data[0].borders[0];

            if(!data2) return;
            // console.log(data2);
            return fetch(`https://restcountries.com/v3.1/alpha/${data2}`);

        }) 
        // A thing to remeber since we dont have a neighbour country for some of the country we need to handle that too like for australia and japan, etc
        .then(response => {
            //not working for countries with zero neighbours as the border object is not present in the JSON response so we cannot read it but when i remove the [0] after border it stops working for other countries(***** NEEDS FIXING ******)
            if(!response.ok) throw new Error(`Country not found (${response.status})`);
            return response.json()})
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.log(`${err} 💥💥💥`);
            renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
        })
        .finally(
            countriesContainer.style.opacity = 1
        );
};


btn.addEventListener('click', function(){
    getCountryAndNeighbour('india');
})
*/

// getCountryAndNeighbour('portugal');






//////////////////////////////////////////////////
////// ******* Reformatting the abouve code to reduce repetation and more readibility
/////////////////////////////////////////////////

/*
const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`
  )
    .then(data => {
        renderCountry(data);
        const data2 = data[0].borders[0];
        //error aa rha hai for country with no neighbour
        if (!data2) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${data2}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
getCountryData('japan');
*/




///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/