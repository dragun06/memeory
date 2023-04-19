class Game {
  players;
  playerScores;
  whosTurn;
  nbTries;
  nbTriesElement;
  cards;
  cardImages;
  playerTurnDisp;
  cardsTurned;
  cardsFound;
  gameVictory;
  sounds;

  constructor(
    _cards,
    _players,
    _playerScores,
    _nbTriesElement,
    _playerTurnDisp,
    _gameVictory,
    _sounds
  ) {
    this.nbTries = 0;
    this.whosTurn = 0;
    this.players = _players;
    this.playerScores = _playerScores;
    this.nbTriesElement = _nbTriesElement;
    this.playerTurnDisp = _playerTurnDisp;
    this.cards = _cards;
    this.cardImages = this.initImages(_cards);
    this.cardsTurned = [];
    this.cardsFound = [];
    this.gameVictory = _gameVictory;
    this.sounds = _sounds;

    console.log(_sounds);

    this.setPlayerTurnDisp();
    this.cards.forEach((card) => {
      card.innerHTML = '';
    });
    this.setTries(0);
  }

  initImages = (_cards) => {
    let cardImages = [];
    _cards.forEach((card) => {
      cardImages.push(card.innerHTML);
    });
    return mixArray(cardImages);
  };

  setTries = (_n) => {
    this.nbTries = _n;
    this.nbTriesElement.innerText = `Nombre de coups: ${this.nbTries}`;
  };

  setPlayerTurnDisp = () => {
    playerTurnDisp.innerText = `Tour de: ${players[this.whosTurn].name}`;
  };

  setScore = (i, value) => {
    players[i].score = value;
    playerScores[i].innerText = `${players[i].name}: ${players[i].score}`;
  };

  isFound(i) {
    if (this.cardsFound.includes(i)) return true;
    return false;
  }

  isTurned(i) {
    if (this.cardsTurned.includes(i)) return true;
    return false;
  }

  nextTurn() {
    if (this.whosTurn < players.length - 1) this.whosTurn += 1;
    else this.whosTurn = 0;
    this.setPlayerTurnDisp();
    this.sounds.playAToi();
  }

  endGame() {
    this.sounds.playApplause();
    this.sounds.playFanfare();
    let winPlayer = [this.players[0]];
    this.players.forEach((player) => {
      if (player.score > winPlayer[0].score) {
        winPlayer = [player];
      } else if (
        player.score === winPlayer[0].score &&
        player.name !== winPlayer[0].name
      ) {
        winPlayer.push(player);
      }
    });
    console.log(this.players);
    this.gameVictory.style.display = 'block';
    winPlayer.forEach((player) => {
      const e = document.createElement('h3');
      e.innerText = player.name;
      this.gameVictory.firstElementChild.nextElementSibling.firstElementChild.appendChild(
        e
      );
    });
  }

  nextMove = (e) => {
    const i = Number(e.target.getAttribute('i'));
    if (!this.isTurned(i) && !this.isFound(i)) {
      if (this.cardsTurned.length < 2) {
        this.sounds.playDiscord();
        this.cards[i].innerHTML = this.cardImages[i];
        this.cardsTurned = [...this.cardsTurned, i];
        this.setTries(this.nbTries + 1);
        if (this.cardsTurned.length === 2) {
          if (
            this.cardImages[this.cardsTurned[0]] ===
            this.cardImages[this.cardsTurned[1]]
          ) {
            this.sounds.playWaw();
            this.cardsFound = [...this.cardsFound, ...this.cardsTurned];
            this.setScore(this.whosTurn, players[this.whosTurn].score + 1);
            this.cardsTurned = [];
            if (this.cardsFound.length === this.cards.length) {
              this.endGame();
            }
          } else {
            this.sounds.playNope();
            setTimeout(() => {
              this.cardsTurned.forEach((i) => {
                if (!this.cardsFound.includes(i)) {
                  this.cards[i].innerHTML = '';
                }
              });
              this.nextTurn();
              this.cardsTurned = [];
            }, 1500);
          }
        }
      } else if (this.cardsTurned.length === 2) {
        // this.cardsTurned.forEach((i) => {
        //   if (!this.cardsFound.includes(i)) {
        //     this.cards[i].innerHTML = '';
        //   }
        // });
        // this.cardsTurned = [];
      }
    } else {
      console.log('Card is turned');
    }
  };
}
