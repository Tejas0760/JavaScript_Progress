'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener
  ('click',openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroolTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);


  //old way to scrool 
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

//new and more optimised way (where you want to scrool to then (.scrollIntoView) then the way by which you want to move into that part)
section1.scrollIntoView({behavior: 'smooth'});

})

///////////////////////////////////////
// Page navigation
// this methos is not efficent as lets say we have a 1000 elements then the foreach method will create a copy for each and every one of them which is not efficent 

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


//making that button pop up effect 
tabContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;
  
  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //adding active class
  clicked.classList.add('operations__tab--active');

  //activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})



//Creating the menu fade option 
const handelHover = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const sibs = link.closest('.nav').querySelectorAll('.nav__link'); 
    const logo = link.closest('.nav').querySelector('img');
  
  sibs.forEach(el => {
    if(el !== link) el.style.opacity = this;
  });
  logo.style.opacity = this;
}
};

nav.addEventListener('mouseover', handelHover.bind(0.5));
nav.addEventListener('mouseout', handelHover.bind(1));

// Creating the sticky nav

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
};

const navObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}
);

navObserver.observe(header);


//creating the section pop up using intersection observer

const allSections = document.querySelectorAll('.section');


const revealSection = function(entries, observer){
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;
  
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

//(adding the hidden class in all the sections via JS)
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//Lazy Loading the image on our website 
const imgTarget = document.querySelectorAll('img[data-src]');

const loadingImg = function(entries, observer){
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  //replave the lazy image with the original image (src => data-src)
  entry.target.src = entry.target.dataset.src;

  //now instead of removing the class directly we will remove it via a function this is because if we remove the blurr it will show the lazy image directly while replacing the image but we only want the blur to be removed when the load is done for that we will use the EventListener 

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTarget.forEach(img => imgObserver.observe(img));


///////////////////////////////////////
// Slider (implementing the slider functionality)
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
////////////////////////////////////////
////////////// LECTURES  //////////////
///////////////////////////////////////

// Selecting, Creating, and Deleting Elements
/*
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

const sections = document.querySelectorAll('.section');
console.log(sections);

const header = document.querySelector('.header');
console.log(header);
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//creating new element (div)

const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie--message');
// cookieMessage.textContent("We Use Cookies for better functionality");
cookieMessage.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(cookieMessage);


//deleting the element 
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  cookieMessage.remove()
});
*/

///////////////////////////////////////
// Styles, Attributes and Classes
//////////////////////////////////////
/*
cookieMessage.style.paddingTop = '30px';
cookieMessage.style.textAlign = 'center';
cookieMessage.style.color = 'white';
cookieMessage.style.backgroundColor = '#37383d';
cookieMessage.style.width = '110%';

console.log(cookieMessage.style.color);
console.log(cookieMessage.style.backgroundColor);

console.log(getComputedStyle(cookieMessage).color);
console.log(getComputedStyle(cookieMessage).height);

cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 +'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');


// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use (Because it will override the original class name)
logo.clasName = 'jonas';
*/


///////////////////////////////////////
// Event Propagation in Practice
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation (Not ususally recommended)
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
*/


///////////////////////////////
/// DOM Traversing 
/////////////////////////////
/*
const h1 = document.querySelector('h1');

//selecting children 
//(this will return the children no matter how far down they are in the tree)
console.log(h1.querySelectorAll('.highlight'));


//traversing children (Going downwards: child)

// will return a node list (this will include everything even comments)
console.log(h1.childNodes);
//will return a htmlcollection  (this will only include the direct children)
console.log(h1.children);

h1.firstElementChild.style.color = 'White';
h1.lastElementChild.style.color = 'Red';


//  Going Upwards: parent(closest will find the parent no matter how every higher up the id or class is to the selected node)

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';


//  Going Sideways: sibling (can only access direct sibling)

console.log(h1.previousElementSibling); //(null if none)
console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

//to traverse and perform some specific action according to the need
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/


