'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getPosition = function() {
  return new Promise( function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

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
        <p class="country__row"><span>🗣️</span>${Object.entries(data[0].languages).map(([key, value]) => `${key.toUpperCase()}: ${value}`).join(', ')}</p>
        <p class="country__row"><span>💰</span>${Object.entries(data[0].currencies).map(([key, {name, symbol}]) => `${key}: ${name} (${symbol})`).join(', ')}</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
}


// ${Object.entries(data[0].languages)
// .map(([code, language]) => `${code.toUpperCase()}: ${language}`)
// .join(`, `)}

// ${Object.entries(data[0].currencies).map(([code, { name, symbol }]) => `${code}: ${name} (${symbol})`).join(', ')}

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
getCountryData('south africa');
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







///////////////////////////////////////
/////// a little bit about the event loop in JS and how JS handels asynchronous tasks when it only works on a single thread
//synchronous tasks takes preferance over the asynchronous part showed via the console.log

/*
console.log("Starting the program");
setTimeout(() => {console.log("Timer part running")}, 0);

//promise will take preferance over the callback queue because the promises are stored in a special queue know as the microtasks queue 
Promise.resolve('Resolved Promise 1').then(response => {
  console.log(response);
});

//a timeout method will make sure that the timeout runs more than or after the timeout specified but not before it because the promises can increase the time taken in the timeout part this can be proved by the code below
Promise.resolve('Time taking Resolved promise').then(res => {
  for(let i = 0; i < 1000000000; i++){}
  console.log(res);
})

console.log("Ending the program");
*/









////////////////////////////////////////
// Simple Resolve promise 
///////////////////////////////////////
/*
const lottery = new Promise(function (resolve, reject) {
  console.log("The lottery draw is happening")
  setTimeout( function(){
  if(Math.random() >= 0.5){
    resolve('You Won!');
  }
  else{
    reject(new Error('You Lost Your Money'));
  }
}, 2000)
});

lottery.then(res => console.log(res)).catch(err => console.error(err)); 



// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/*
const getPosition = function() {
  return new Promise( function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));


const whereAmI = function (lat, lng) {
  getPosition().then( pos => {
    const {latitude : lat, longitude : lng} = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
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

btn.addEventListener('click', whereAmI);
*/




///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/


/*
let currentImg;
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadImage = function(imgSrc){
  return new Promise(function(resolve, reject){
    const img = document.createElement('img');
    img.src = imgSrc;

    img.addEventListener('load', function(){
      imgContainer.append(img);
      resolve(img);
    })

    img.addEventListener('error', function() {
      reject(new Error('Error in loading the image'));
    })
  })
}


loadImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return loadImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));


  */



///////////////////////////////////////////////////////////////
//  *******************  ASYNC AWAIT *********************  //
//////////////////////////////////////////////////////////////

/*
const loadPage = async function(){
  try{
  const pos = await getPosition()
  const {latitude : lat, longitude : lng} = pos.coords;

  const geoUrl = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  if (!geoUrl.ok) throw new Error('Problem getting location data');

  const dataGeo = await geoUrl.json();
  // console.log(dataGeo);

  const cntryUrl = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`)
  if(!cntryUrl.ok) throw new Error('Problem getting country data');

  const data = await cntryUrl.json();
  // console.log(data[0].languages);
  // console.log(data[0].currencies);
  // console.log(data);

  renderCountry(data);

  return (`You are currently in ${dataGeo.city}, ${dataGeo.country}`);
  }
  catch(err){
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
}
*/
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

//////////////////////////////////////////////
// Properly handeling the promises returned 
/*
console.log("1: Starting the program");

( async function() {
  try{
    const fetching = await loadPage();
    // console.log(fetching);
    console.log(`2: ${fetching}`);
  }
  catch(err){
    console.error(`2: ${err.message}`);
  }
  console.log("3: Finished getting location");
})();

// console.log(` 3: finished getting location`)
*/


///////////////////////////???/////////////////
//////  Running promises in parallel 
//////////////////////////////////////////////

/*
const getFourCountries = async function(c1, c2, c3, c4){
  //this happens when you run similar 3-4 promises together (see in the network tab)
  try{
    // Until the first promise is not finished the other will not execute and the order can be anything

  //   const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
  //   const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
  //   const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
  //   const [data4] = await getJSON(`https://restcountries.com/v3.1/name/${c4}`);

  // console.log([data1.capital, data2.capital, data3.capital, data4.capital])


  // to call all the promise in parallel we use promise.all 
  // this will now return a new promise which will call all the other promises in parallel improving the speed of the website
  // but a big downside to this is ***** IF EVEN ONE PROMISES GET REJECTED OR NOT RESOLVED THEN THE WHOLE CHAIN WILL BREAK AND IT WILL NOT RETURN ANYTHING
  // promise.all takes an array of arguments  
  const data = await Promise.all([
    getJSON(`https://restcountries.com/v3.1/name/${c1}`),
    getJSON(`https://restcountries.com/v3.1/name/${c2}`), 
    getJSON(`https://restcountries.com/v3.1/name/${c3}`), 
    getJSON(`https://restcountries.com/v3.1/name/${c4}`)
  ]);
  console.log(data);
  // console.log(data.map(d => d[0].capital)); // returning an nested array so used flat here to flatten the result according to the desired result 
  console.log(data.map(d => d[0]?.capital));
  const capitals = data.map(d => d[0]?.capital).flat();
  console.log(capitals);
  }
  catch(err){
    console.error(err);
  }
}


getFourCountries('india','japan','australia','china','spain');
*/



//////////////////////////////////////////////////////
// some more promises Combinators (all,race,allSetteled,any)
//////////////////////////////////////////////////////
/*
(async function(){
  try{
    const data = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/mexico`),
      getJSON(`https://restcountries.com/v3.1/name/japan`), 
      getJSON(`https://restcountries.com/v3.1/name/australia`), 
      getJSON(`https://restcountries.com/v3.1/name/egypt`)
    ])
    const {name:{common, official}} = data[0];
    console.log(common);
    console.log('First resolved promise data:', data[0]);
    console.log(data[0]);
  }
  catch(err){
    console.error(err);
  }
})()



const timeout = function(sec){
  return new Promise(function(_, reject){
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  })
}

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/mexico`),
  timeout(0.001)
])
.then(res => console.log(res))
.catch(err => console.error(err));


// Promise.allSettled (Will return all the promises no matter even if they are rejected unlike the promise all)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));


//As we have studied earlier this will short circuit if even one of the promise is rejected it will reject as a whole
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021](Will return a new promise which will be the value of any one of the fullfilled promise and will only reject when all the provided promises are rejected)
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
  */







///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 1
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/