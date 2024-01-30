const cells = document.querySelectorAll(".cell");

const restartBtn = document.querySelector("#rematch");
const playerX = document.querySelector(".player-one");
const playerY = document.querySelector(".player-two");
const winConditions = [
  [0, 1, 2],

  [3, 4, 5],

  [6, 7, 8],

  [0, 3, 6],

  [1, 4, 7],

  [2, 5, 8],

  [0, 4, 8],

  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));

  restartBtn.addEventListener("click", restartGame);

  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);

  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;

  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  if (currentPlayer === "X") {
    playerX.classList.add("playing");
    playerY.classList.remove("playing");
  } else {
    playerY.classList.add("playing");
    playerX.classList.remove("playing");
  }
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];

    const cellA = options[condition[0]];

    const cellB = options[condition[1]];

    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;

      for (let i = 0; i < 3; i++) {
        cells[condition[i]].classList.add("won");
      }
      break;
    }
  }

  if (roundWon) {
    running = false;
  } else if (!options.includes("")) {
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";

  options = ["", "", "", "", "", "", "", "", ""];

  cells.forEach((cell) => {
    cell.textContent = "";
    if (cell.classList.contains("won")) cell.classList.remove("won");
  });

  running = true;
}
