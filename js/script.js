const guessedLetter = document.querySelector(".guessed-letters");
const hintMessage = document.querySelector(".message");
const remainMessage = document.querySelector(".remaining")
const numOfremainig = document.querySelector(".remaining span");
const wordInProgress = document.querySelector(".word-in-progress");
const letterInput = document.querySelector(".letter");
const guessLetterButton = document.querySelector(".guess")
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = function(word){
    const placeholderLetters = [];
    for (let letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});