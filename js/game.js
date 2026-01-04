import { Modal } from './modal.js';
const modal = new Modal('#my-modal', '#open-modal');

document.addEventListener("DOMContentLoaded", () => {
let words = [];

async function loadFile(){
  try {
    const res = await fetch('../../assets/example-words.json');
    words = await res.json();
  } catch(e) {
 console.log(e + " ERROR");

  }
}

  let randomWord = "";
  let goodLetters = [];
  let wrongLetters = 0;

  const hangmanImage = document.getElementById("hangman-image");
  const wordContainer = document.getElementById("word");
  const lettersContainer = document.getElementById("letters");
  const resultContainer = document.getElementById("result-container");
  const resultTitle = document.getElementById("result-title");
  const resultWord = document.getElementById("result-word");
  const gameButtons = document.getElementById("game-buttons");
  const playAgainBtn = document.getElementById("play-again");



  function startGame() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    goodLetters = Array(randomWord.length).fill("_");
    wrongLetters = 0;

    resultContainer.style.display = "none";
    wordContainer.style.display = "block";
    lettersContainer.style.display = "block";
    hangmanImage.src = "../img/h-0.jpg";
    gameButtons.style.display = "flex";
    displayWord();
    createKeyboard();
  }

  function displayWord() {
    wordContainer.textContent = goodLetters.join(" ");
  }

  function createKeyboard() {
    lettersContainer.innerHTML = "";
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    rows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("keyboard-row");

      row.split("").forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.addEventListener("click", () => guessLetter(letter, btn));
        rowDiv.appendChild(btn);
      });

      lettersContainer.appendChild(rowDiv);
    });
  }



  function guessLetter(letter, btn) {
    btn.disabled = true;

    if (randomWord.includes(letter)) {
      randomWord.split("").forEach((n, i) => {
        if (n === letter) goodLetters[i] = letter;
      });
      displayWord();

      if (!goodLetters.includes("_")) endGame(true);
    } else {
      wrongLetters++;
      hangmanImage.src = `../img/h-${wrongLetters}.jpg`;

      if (wrongLetters >= 10) endGame(false);
    }
  }
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key >= "a" && key <= "z") {
    const button = Array.from(document.querySelectorAll(".keyboard-row button"))
      .find(b => b.textContent.toLowerCase() === key && !b.disabled);
    if (button) {
      guessLetter(key, button); }
  }
});

  function endGame(won) {
    resultTitle.textContent = won ? "You Won!" : "You Lost !";
    resultWord.textContent = randomWord.toUpperCase();
    wordContainer.style.display = "none";
    lettersContainer.style.display = "none";
    resultContainer.style.display = "block";
    gameButtons.style.display = "none";
  }

playAgainBtn.addEventListener("click", startGame);

(async () => {
  await loadFile();
  startGame();
})();

});

