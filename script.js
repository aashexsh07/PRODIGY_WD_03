const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const statusMessage = document.getElementById('status-message');
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (clickedCell.textContent !== '' || !gameActive) {
    return;
  }

  placeMark(clickedCell, cellIndex);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    if (currentPlayer === 'O') {
      setTimeout(() => {
        makeAIMove();
      }, 800);
    }
  }
}

function placeMark(clickedCell, cellIndex) {
  clickedCell.textContent = currentPlayer;
}

function makeAIMove() {
  const availableCells = [];
  cells.forEach((cell, index) => {
    if (cell.textContent === '') {
      availableCells.push(index);
    }
  });

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const cellIndex = availableCells[randomIndex];
  const selectedCell = cells[cellIndex];
  placeMark(selectedCell, cellIndex);

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => cell.textContent !== '');
}

function endGame(draw) {
  if (draw) {
    statusMessage.textContent = "It's a draw!";
  } else {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
  }
  gameActive = false;
}

function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = '';
  });
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
