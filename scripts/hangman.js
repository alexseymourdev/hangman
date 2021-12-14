let objHangman = {
    init(){
        this.generateRandomWord();
        this.getAllElements();
        this.addLettersToGame();
        this.guessLetters = document.querySelectorAll('.guessLetter');
        this.addEventListeners();
        this.lifeCounter = 0;
        console.log(this);
        console.log(this.word);
    },
    generateRandomWord:function(){
        let maxNumber = words.length;
        const rndInt = this.randomIntFromInterval(0, maxNumber);
        this.word = words[rndInt];
    },
    addLettersToGame:function(){
        let guessLetterHTML = '<div class="guessLetter"></div>';
        for(counter=0; counter < this.word.length; counter++){
            this.guessContainer.insertAdjacentHTML( 'beforeend', guessLetterHTML );
        }
    },
    getAllElements:function(){
        // do nothing
        this.allLetters = document.querySelectorAll('.alphabetContainer .letter');
        this.guessContainer = document.querySelector('.guessContainer');
        this.wrongGuessContainer = document.querySelector('.wrongGuessContainer');
    },
    addEventListeners:function(){
        let _self = this;
        this.allLetters.forEach(function(letter){
            // console.log(letter);
            letter.addEventListener('click',function(event){
                let currentLetterHTML = event.target;
                // console.log(currentLetterHTML);
                if(!currentLetterHTML.classList.contains('clicked')){
                    let currentLetter = event.target.innerHTML.toLowerCase();
                    // console.log(currentLetter);
                    currentLetterHTML.classList.add('clicked');
                    _self.checkCurrentLetter(currentLetter);
                }
            });
        });
        document.addEventListener('keyup',function(event){
            // console.log(event.key);
            let currentLetter = event.key.toUpperCase();
            _self.allLetters.forEach(function(letter){
                let dataLetter = letter.innerHTML;
                // console.log(dataLetter);
                if(currentLetter == dataLetter){
                    if(!letter.classList.contains('clicked')){
                        currentLetter = currentLetter.toLowerCase();
                        // console.log(currentLetter);
                        letter.classList.add('clicked');
                        _self.checkCurrentLetter(currentLetter);
                    }
                }
            });
        });
    },
    checkCurrentLetter:function(currentLetter){
        let _self = this;
        let answers = [...this.word.matchAll(currentLetter)];
        // console.log(answers);
        if(answers.length){
            answers.forEach(function(answer){
                // console.log(answer.index);
                for(counter=0; counter < _self.guessLetters.length; counter++){
                    if(counter == answer.index){
                        // console.log('Correct letter');
                        _self.guessLetters[answer.index].innerHTML = currentLetter.toUpperCase();
                    }
                }
                _self.checkWin();
            });
        } else {
            //show the next part of the hangman.
            let wrongGuessLetterHTML = '<div class="wrongGuessLetter">'+currentLetter.toUpperCase()+'</div>';
            this.wrongGuessContainer.insertAdjacentHTML( 'beforeend', wrongGuessLetterHTML );
            this.lifeCounter++;
            // console.log(lifeCounter);
            let currentLifeSelector = '.life'+this.lifeCounter;
            // console.log(currentLifeSelector);
            let currentLifeElement = document.querySelector(currentLifeSelector);
            currentLifeElement.classList.add('active');
            if(this.lifeCounter == 11){
                this.endGame();
            }
        }
    },
    checkWin:function(){
        blnGameWon = true;
        for(counter=0; counter < this.guessLetters.length; counter++){
            let innerHTML = this.guessLetters[counter].innerHTML;
            // console.log(innerHTML);
            if(!innerHTML){
                blnGameWon = false;
            }
        }
        if(blnGameWon){
            this.endGame();
        }
    },
    endGame:function(){
        this.allLetters.forEach(function(letter){
            // console.log(letter);
            letter.classList.add('clicked');
        });
    },
    randomIntFromInterval:function(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

objHangman.init();
