'use strict';

const gameContainer = document.querySelector('.game-container');
const playerScore = document.querySelector('.player-score');
const resultMessage = document.querySelector('.result-message');
const resultMsgDesc = document.querySelector('.result-msg-desc');
const playerChoice = document.querySelector('.player-choice');
const choices = document.querySelectorAll('.choice');
const resetGameContainer = document.querySelector('.reset-game');
const resetBtn = document.querySelector('.reset-btn');
const newBtn = document.querySelector('.new-btn');
const compScore = document.querySelector('.comp-score');
const compChoice = document.querySelector('.comp-choice');

let scores = [0, 0];
let isPlayable = true;

const CHOICES = ['Rock', 'Paper', 'Scissors'];

const renderOnStart = function () {
  resetBtn.classList.remove('hidden');
  playerChoice.classList.remove('hidden');
  compChoice.classList.remove('hidden');
  playerChoice.innerHTML = '';
  compChoice.innerHTML = '';
};

const getComputerChoice = function () {
  const i = Math.trunc(Math.random() * CHOICES.length);
  return CHOICES[i];
};

const displayChoices = function (plSelection, compSelection) {
  playerChoice.insertAdjacentHTML(
    'afterbegin',
    `<img src="./images/${plSelection.toLowerCase()}.png" alt="${plSelection}">`
  );
  compChoice.insertAdjacentHTML(
    'afterbegin',
    `<img src="./images/${compSelection.toLowerCase()}.png" alt="${compSelection}">`
  );
};

const playRound = function (playerSelection, computerSelection) {
  if (playerSelection === computerSelection) return 'TIE!';
  if (playerSelection === 'Rock') {
    return `YOU ${computerSelection === 'Scissors' ? 'WIN' : 'LOSE'}!`;
  } else if (playerSelection === 'Paper') {
    return `YOU ${computerSelection === 'Rock' ? 'WIN' : 'LOSE'}!`;
  } else {
    return `YOU ${computerSelection === 'Paper' ? 'WIN' : 'LOSE'}!`;
  }
};

const displayRoundResult = function (plSelection, compSelection, arr) {
  if (resultMessage.textContent === 'YOU WIN!') {
    resultMsgDesc.textContent = `${plSelection} beats ${compSelection}`;
    playerScore.textContent = ++arr[0];
  } else if (resultMessage.textContent === 'YOU LOSE!') {
    resultMsgDesc.textContent = `${compSelection} beats ${plSelection}`;
    compScore.textContent = ++arr[1];
  } else resultMsgDesc.textContent = '';
};

const displayGameResult = function (arr) {
  if (arr.includes(5)) {
    resultMessage.textContent = `You ${
      playerScore.textContent === '5' ? 'won' : 'lost'
    } the game!`;
    resultMsgDesc.textContent = '';
    isPlayable = false;
    resetBtn.classList.toggle('hidden');
    newBtn.classList.toggle('hidden');
  }
};

const resetGame = function (scores) {
  playerChoice.classList.add('hidden');
  compChoice.classList.add('hidden');
  playerScore.textContent = compScore.textContent = '0';
  scores = [0, 0];
  resultMessage.textContent = '';
  resultMsgDesc.textContent = '';
};

gameContainer.addEventListener('click', function (e) {
  if (isPlayable) {
    const target = e.target;
    if (target?.localName !== 'img') return;
    renderOnStart();

    const playerSelection = target.alt;
    const computerSelection = getComputerChoice();

    displayChoices(playerSelection, computerSelection);
    resultMessage.textContent = playRound(playerSelection, computerSelection);
    displayRoundResult(playerSelection, computerSelection, scores);
    displayGameResult(scores);
  }
});

resetGameContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('btn')) return;
  if (target.classList.contains('new-btn')) {
    isPlayable = true;
    newBtn.classList.toggle('hidden');
  } else resetBtn.classList.toggle('hidden');
  resetGame(scores);
});
