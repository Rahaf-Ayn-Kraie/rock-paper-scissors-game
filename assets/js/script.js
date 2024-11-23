'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const rockButton = select('.rock-button');
const paperButton = select('.paper-button');
const scissorsButton = select('.scissors-button');
const resultText = select('.result');
const movesText = select('.moves');
const scoreText = select('.score');
const resetButton = select('.reset-button');

const score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
  score.wins = savedScore.wins;
  score.losses = savedScore.losses;
  score.ties = savedScore.ties;
}

function updateScore() {
  scoreText.textContent = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
  localStorage.setItem('score', JSON.stringify(score));
}

updateScore();

listen('click', rockButton, () => playGame('rock'));
listen('click', paperButton, () => playGame('paper'));
listen('click', scissorsButton, () => playGame('scissors'));

listen('click', resetButton, () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
  resultText.textContent = ''; 
  movesText.textContent = '';
});

function playGame(playerMove) {
  const computerMove = getComputerMove();
  const winner = getWinner(playerMove, computerMove);

  movesText.textContent = `You played ${playerMove}, Computer played ${computerMove}.`;

  if (winner === 'player') {
    score.wins++;
    resultText.textContent = 'You win!';
  } else if (winner === 'computer') {
    score.losses++;
    resultText.textContent = 'Computer wins!';
  } else {
    score.ties++;
    resultText.textContent = 'It\'s a tie!';
  }

  updateScore();
}

function getComputerMove() {
  const random = Math.random();
  if (random < 0.34) return 'rock';
  if (random < 0.67) return 'paper';
  return 'scissors';
}

function getWinner(playerMove, computerMove) {
  if (playerMove === computerMove) return 'tie';
  if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
}
