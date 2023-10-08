'use strict';

const CHOICES = ['Rock', 'Paper', 'Scissors'];

const getComputerChoice = function () {
  const i = Math.trunc(Math.random() * CHOICES.length);
  return CHOICES[i];
};

const getPlayerChoice = function () {
  let playerSelection = '';

  do {
    playerSelection = prompt('Choose between "Rock", "Paper" and "Scissors": ');
    playerSelection =
      playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
  } while (!CHOICES.includes(playerSelection));

  return playerSelection;
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

const play = function (playRound, n) {
  for (let i = 0; i < n; i++) {
    console.log(playRound(getPlayerChoice(), getComputerChoice()));
  }
};

// play(playRound, 5);
