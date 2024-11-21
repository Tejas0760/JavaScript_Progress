'use strict';

const usr01 = document.querySelector('.player--0');
const usr02 = document.querySelector('.player--1');
const score01 = document.getElementById('score--0');
const score02 = document.getElementById('score--1');
const current01 = document.getElementById('current--0');
const current02 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const diceNew = document.querySelector('.btn--new');
const diceRoll = document.querySelector('.btn--roll');
const diceHold = document.querySelector('.btn--hold');

// const score01 = document.querySelectorAll('.score');
// for(let i = 0; i < score01.length; i++){
//     score01[i].classList.add('hidden');
// }

let score, currentScore, activePlayer, playing;

const init = function(){
    score = [0,0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    
    score01.textContent = 0;
    score02.textContent = 0;
    current01.textContent = 0;
    current02.textContent = 0;

    diceEl.classList.add('hidden');
    usr01.classList.remove('player--winner');
    usr02.classList.remove('player--winner');
    usr01.classList.add('player--active');
    usr02.classList.remove('player--active');
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    usr01.classList.toggle('player--active');
    usr02.classList.toggle('player--active');
}


diceEl.classList.add('hidden');
score01.textContent = 0;
score02.textContent = 0;

diceRoll.addEventListener('click', function(){
    if(playing){

    //random number generate between 1 - 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //show that dice image 
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //add the dice number into the current score
    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
        switchPlayer();
    }
    }
})

diceHold.addEventListener('click', function(){
    if(playing){
        // 1. Add current score to active player's score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // 2. Check if player's score is >= 100
        if(score[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
            switchPlayer();
        }
    }
})


diceNew.addEventListener('click', init);