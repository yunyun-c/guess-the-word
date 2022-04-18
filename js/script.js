const letterInput = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const guessedLettersElement = document.querySelector(".guessed-letters");
const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];
const remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch (" https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt ");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Match.floor(Match.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function(word) {
    let placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e) {

    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;

    const goodGuess =  validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/

    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if(input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }else if(!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z."
    }else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        showGuessedLetters();
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";

    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
     for (const letter of wordArray) {
         if(guessedLetters.includes(letter)) {
             revealWord.push(letter.toUpperCase())
         } else {
             revealWord.push("●");
         }
     }

     wordInProgress.innerText = revealWord.join("");
     checkIfWin();
};

const updateGuessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
};

const checkIfWin = function() {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

const startOver = function() {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener('click', function() {
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgain.classList.add("hide");
})