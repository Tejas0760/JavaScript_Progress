'use strict';

let score = 20;
const number = Math.trunc(Math.random() * 20) + 1;
let highscore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};
// document.querySelector('.message').textContent = "Hehehehe"
document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if(!guess){
        displayMessage("Not A Number You IdiOt 😡");
    }
    else if(guess === number){
        displayMessage("Correct NUmber 🎉");
        document.querySelector('.number').textContent = number;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
          }
    }
    else if(guess !== number){
        if(score > 1){
            displayMessage(guess > number ? 'Too High!' : 'Too Low');
            score--;
        }
        else{
            displayMessage('💥 YOu LosT ThE GaMe.');
            document.querySelector('.score').textContent = 0;
        }
    }
})
