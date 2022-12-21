let winningMessageText = document.getElementById("winningMessageText");
let nowPlaying = document.getElementById("nowPlaying");
let restartButton = document.getElementById("restartButton");
let cells = Array.from(document.getElementsByClassName("cell"));
let winningColor = getComputedStyle(document.body).getPropertyValue(
  "--wining-combo"
);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let gameBoard = Array(9).fill(null);
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  restart();
};

function cellClicked(e) {
  const cell = e.target;

  placeMark(cell);

  const draw = true;
  if (playerHasWon()) {
    gameOver(!draw);
  } else if(checkDraw()) {
    gameOver(draw);
  } else {
    swapPlayers();
  }
}

function placeMark(cell) {
  gameBoard[cell.id] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.style["cursor"] = "default";
}

function gameOver(isDraw) {
  nowPlaying.style["display"] = "none";
  
  if(isDraw) {
    winningMessageText.innerText = "It's a draw!";
  } else {
    winningMessageText.innerText = `${currentPlayer} has won!`;
  }
  
  winningMessageText.style["display"] = "";

  cells.forEach((cell) => {
    cell.removeEventListener("click", cellClicked);
    cell.style["cursor"] = "default";
  });
}

function swapPlayers() {
  currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  nowPlaying.innerText = `Now Playing: ${currentPlayer}`;
}

function playerHasWon() {
  for (const combo of winningCombos) {
    let [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] == gameBoard[b] &&
      gameBoard[b] == gameBoard[c]
    ) {
      cells[a].style.color = winningColor;
      cells[b].style.color = winningColor;
      cells[c].style.color = winningColor;
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return gameBoard.every(cell => {
    return cell != null
  })
}

restartButton.addEventListener("click", restart);

function restart() {
  gameBoard.fill(null);

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.color = "";
    cell.style["cursor"] = "pointer";
  });

  nowPlaying.style["display"] = "";
  winningMessageText.style["display"] = "none";

  cells.forEach((cell) =>
    cell.addEventListener("click", cellClicked, { once: true })
  );

  currentPlayer = X_TEXT;
  nowPlaying.innerText = `Now Playing: ${currentPlayer}`;
}

startGame();
