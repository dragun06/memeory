// VAR INITIALIZATION

const players = JSON.parse(localStorage.getItem('players')); // List of players
const scoreList = document.querySelector('.scores-list'); // Score list DOM element
const nbTriesElement = document.querySelector('.nb-tries'); // Number of tries DOM element
const playerTurnDisp = document.querySelector('.player-turn'); // Player turn DOM element
const cards = document.querySelectorAll('.cartes'); // Array of cards DOM element
const gameVictory = document.querySelector('.game-victory'); // Modal when game ends
const parameters = document.querySelector('.game-parameters'); // Modal for parameters
const forfeit = document.querySelector('.game-forfeit'); // Modal for forfeit
const chrono = document.getElementById('chrono'); // Location for timer
const soundFiles = [
  'void-traveler.mp3',
  'carte.mp3',
  'applaudissement.mp3',
  'honteux.mp3',
  'duel.mp3',
  'atoi.mp3',
  'nope.mp3',
  'wow.mp3',
  'fanfare.mp3',
];

// EVENT LISTENERS

document.querySelector('.game').addEventListener('click', handleGameClick); // Click in-game
document
  .querySelector('.game-victory')
  .addEventListener('click', handleVictoryClick); // Click in end game
document.querySelector('.parameters').addEventListener('click', showParams);
parameters.addEventListener('click', handleInParamClick);
forfeit.addEventListener('click', handleForfeitClick);

// GAME INIT

const playerScores = initScoreList(); // Scores list init
const sounds = new Sound([...soundFiles]);
console.log(sounds);
const game = new Game(
  cards,
  players,
  playerScores,
  nbTriesElement,
  playerTurnDisp,
  gameVictory,
  sounds
);

sounds.playDuel();

// Uncomment this to run tests on end game
// test(game);

// EVENT HANDLERS

function handleGameClick(e) {
  if (e.target.className === 'cartes') {
    game.nextMove(e);
  }
}

function handleVictoryClick(e) {
  if (
    e.target.classList.contains('game-victory-rematch') ||
    e.target.parentNode.classList.contains('game-victory-rematch')
  ) {
    rematch();
  } else if (
    e.target.classList.contains('game-victory-quit') ||
    e.target.parentNode.classList.contains('game-victory-quit')
  ) {
    quitGame();
  }
}

function handleInParamClick(e) {
  console.log(e.target);
  if (
    e.target.classList.contains('game-parameter-forfeit') ||
    e.target.parentNode.classList.contains('game-parameter-forfeit')
  ) {
    parameters.style.display = 'none';
    forfeit.style.display = 'block';
    sounds.playForfeit();
  } else if (e.target.classList.contains('music-slider')) {
    sounds.playPauseMusic();
  } else if (e.target.classList.contains('sound-slider')) {
    sounds.soundOnOff();
  }
}

function handleForfeitClick(e) {
  if (e.target.classList.contains('no-forfeit')) forfeit.style.display = 'none';
  else if (e.target.classList.contains('confirm-forfeit')) quitGame();
}

// FUNCTIONS

function initScoreList() {
  let playerScores = [];
  // Remove all current node
  scoreList.innerHTML = '';

  // Set the players list
  players.forEach((player) => {
    const playerScore = document.createElement('li');
    playerScore.className = 'background-game';
    playerScore.innerHTML = `<h4>${player.name}: 0</h4>`;
    scoreList.appendChild(playerScore);
    playerScores.push(scoreList.lastElementChild);
  });

  return playerScores;
}

function mixArray(array) {
  // Utilisation de l'algorithme de Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function rematch() {
  document.location.assign('./tour.html');
}

function quitGame() {
  document.location.assign('../index.html');
}

function showParams() {
  if (parameters.style.display !== 'block' && forfeit.style.display !== 'block')
    parameters.style.display = 'block';
  else parameters.style.display = 'none';
}

function test(o) {
  o.cardsFound = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
