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
    //   countriesContainer.style.opacity = 1;
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