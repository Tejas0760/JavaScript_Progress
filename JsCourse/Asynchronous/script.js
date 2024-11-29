'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const country = India;
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  };

  getCountryData('india');



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