'use strict';

const gameContainer = document.querySelector('.game-container');
const currentScore = document.querySelector('.current-score');
const currentChoices = document.querySelector('.current-choices');
const currentResult = document.querySelector('.current-result');
const choiceImgs = document.querySelectorAll('.choice-img');
const resetBtn = document.querySelector('.reset-btn');
const newBtn = document.querySelector('.new-btn');
let playerScore = 0;
let compScore = 0;
let isPlayable = true;

const CHOICES = ['Rock', 'Paper', 'Scissors'];

const getComputerChoice = function () {
  const i = Math.trunc(Math.random() * CHOICES.length);
  return CHOICES[i];
};

const playRound = function (playerSelection, computerSelection) {
  if (playerSelection === computerSelection) return 'Tie!';
  if (playerSelection === 'Rock') {
    return `You ${computerSelection === 'Scissors' ? 'win' : 'lose'}! ${
      computerSelection === 'Scissors'
        ? 'Rock beats Scissors'
        : 'Paper beats Rock'
    }`;
  } else if (playerSelection === 'Paper') {
    return `You ${computerSelection === 'Rock' ? 'win' : 'lose'}! ${
      computerSelection === 'Rock' ? 'Paper beats Rock' : 'Scissors beat Paper'
    }`;
  } else {
    return `You ${computerSelection === 'Paper' ? 'win' : 'lose'}! ${
      computerSelection === 'Paper'
        ? 'Scissors beat Paper'
        : 'Rock beats Scissors'
    }`;
  }
};

gameContainer.addEventListener('click', function (e) {
  if (isPlayable) {
    const target = e.target;
    if (target.localName !== 'img') return;

    resetBtn.classList.remove('hidden');
    currentChoices.innerHTML = '';
    const playerSelection = target.alt;
    const computerSelection = getComputerChoice();
    currentChoices.insertAdjacentHTML(
      'afterbegin',
      `<img src="./images/${playerSelection.toLowerCase()}.png" alt="${playerSelection}" width="50">
      <span>vs</span>
      <img src="./images/${computerSelection.toLowerCase()}.png" alt="${computerSelection}" width="50">`
    );
    currentResult.textContent = playRound(playerSelection, computerSelection);
    if (currentResult.textContent.includes('You win!')) playerScore++;
    else if (currentResult.textContent.includes('You lose!')) compScore++;

    currentScore.textContent = `${playerScore} - ${compScore}`;
    if (playerScore === 5 || compScore === 5) {
      currentResult.textContent = `You ${
        playerScore === 5 ? 'win! Congratulations!' : 'lost. Please try again!'
      }`;
      isPlayable = false;
      resetBtn.classList.toggle('hidden');
      newBtn.classList.toggle('hidden');
    }
  }
});

resetBtn.addEventListener('click', function () {
  resetBtn.classList.toggle('hidden');
  currentScore.textContent = '';
  currentChoices.innerHTML = '';
  currentResult.textContent = '';
  playerScore = compScore = 0;
});
