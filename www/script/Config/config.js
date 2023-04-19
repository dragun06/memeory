localStorage.clear();
localStorage.setItem('nbPlayers', 2);

const list = document.querySelector('.player-list');
list.addEventListener('click', handleClick);

const submitButton = document.querySelector('.submit-players');
submitButton.addEventListener('click', handleSubmit);

function handleClick(e) {
  if (e.target.classList.contains('add-field')) {
    createPlayerField(e);
    e.preventDefault();
  } else if (e.target.classList.contains('remove-field')) {
    removePlayerField(e);
    e.preventDefault();
  }
}

function handleSubmit(e) {
  submitPlayers(e);
}

function createPlayerField(e) {
  const nbPlayers = Number(localStorage.getItem('nbPlayers'));

  if (nbPlayers < 5) {
    const removable =
      list.lastElementChild.firstElementChild.firstElementChild.lastElementChild
        .firstElementChild;
    if (removable.childElementCount === 2) {
      removable.childNodes[3].remove();
    }
    const removeBtn = createRemoveButton();

    const newPlayer = document.querySelector('.new-player').cloneNode(true);
    newPlayer.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText = `Joueur ${
      nbPlayers + 1
    } :`;
    newPlayer.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.setAttribute(
      'id',
      `name${nbPlayers}`
    );
    newPlayer.className =
      'col-lg-12 new-player player-form align-center player-height removable-field';
    newPlayer.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.value =
      '';

    newPlayer.firstElementChild.firstElementChild.lastElementChild.firstElementChild.appendChild(
      removeBtn
    );

    localStorage.setItem(
      'nbPlayers',
      Number(localStorage.getItem('nbPlayers')) + 1
    );

    list.appendChild(newPlayer);
  }
}

function removePlayerField(e) {
  const field =
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  if (field.classList.contains('removable-field')) {
    if (field.previousElementSibling.classList.contains('removable-field')) {
      field.previousElementSibling.firstElementChild.firstElementChild.lastElementChild.firstElementChild.appendChild(
        createRemoveButton()
      );
    }
    field.remove();
    localStorage.setItem(
      'nbPlayers',
      Number(localStorage.getItem('nbPlayers')) - 1
    );
  }
}

function submitPlayers(e) {
  console.log('Submit');
  const playerForms = document.querySelectorAll('.player-form');

  let players = [];
  playerForms.forEach((form, index) => {
    let playerName =
      form.firstElementChild.firstElementChild.firstElementChild
        .nextElementSibling.firstElementChild.firstElementChild.value;
    if (playerName === '') playerName = `Joueur ${index + 1}`;
    let playerType;
    if (!form.classList.contains('first-player')) {
      playerType =
        form.firstElementChild.firstElementChild.firstElementChild
          .nextElementSibling.nextElementSibling.firstElementChild
          .firstElementChild.value;
    } else {
      playerType = 'Joueur';
    }
    players.push({ name: playerName, type: playerType, score: 0 });
  });

  console.log(players);
  localStorage.setItem('players', JSON.stringify(players));
}

function createRemoveButton() {
  const removeBtn = document.createElement('img');
  removeBtn.className = 'remove-field';
  removeBtn.setAttribute('width', '40px');
  removeBtn.setAttribute('src', '../iconmonstr-minus-4.svg');
  return removeBtn;
}
