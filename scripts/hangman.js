function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let maxNumber = words.length;
const rndInt = randomIntFromInterval(0, maxNumber);
console.log(maxNumber);
console.log(rndInt);

let word = words[rndInt];
console.log(word);

let allLetters = document.querySelectorAll('.alphabetContainer .letter');
let guessContainer = document.querySelector('.guessContainer');
let wrongGuessContainer = document.querySelector('.wrongGuessContainer');
// console.log(allLetters);
console.log(wrongGuessContainer);
let guessLetterHTML = '<div class="guessLetter"></div>';
for(counter=0; counter < word.length; counter++){
    guessContainer.insertAdjacentHTML( 'beforeend', guessLetterHTML );
}
let guessLetters = document.querySelectorAll('.guessLetter');
let lifeCounter = 0;
allLetters.forEach(function(letter){
    // console.log(letter);
    letter.addEventListener('click',function(event){
        let currentLetterHTML = event.target;
        // console.log(currentLetterHTML);
        if(!currentLetterHTML.classList.contains('clicked')){
            let currentLetter = event.target.innerHTML.toLowerCase();
            // console.log(currentLetter);
            currentLetterHTML.classList.add('clicked');
            checkCurrentLetter(currentLetter);
        }
    });
});

function checkCurrentLetter(currentLetter){
    let answers = [...word.matchAll(currentLetter)];
    // console.log(answers);
    if(answers.length){
        answers.forEach(function(answer){
            // console.log(answer.index);
            for(counter=0; counter < guessLetters.length; counter++){
                if(counter == answer.index){
                    // console.log('Correct letter');
                    guessLetters[answer.index].innerHTML = currentLetter.toUpperCase();
                }
            }
            checkWin();
        });
    } else {
        //show the next part of the hangman.
        let wrongGuessLetterHTML = '<div class="wrongGuessLetter">'+currentLetter.toUpperCase()+'</div>';
        wrongGuessContainer.insertAdjacentHTML( 'beforeend', wrongGuessLetterHTML );
        lifeCounter++;
        // console.log(lifeCounter);
        let currentLifeSelector = '.life'+lifeCounter;
        // console.log(currentLifeSelector);
        let currentLifeElement = document.querySelector(currentLifeSelector);
        currentLifeElement.classList.add('active');
        if(lifeCounter == 11){
            endGame();
        }
    }
}

function checkWin(){
    blnGameWon = true;
    for(counter=0; counter < guessLetters.length; counter++){
        let innerHTML = guessLetters[counter].innerHTML;
        // console.log(innerHTML);
        if(!innerHTML){
            blnGameWon = false;
        }
    }
    if(blnGameWon){
        endGame();
    }
}

function endGame(){
    allLetters.forEach(function(letter){
        // console.log(letter);
        letter.classList.add('clicked');
    });
}