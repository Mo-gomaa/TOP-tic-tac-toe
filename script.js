const TicTacToe = (function () {
  let playerTurn = "X";
  let order = 1;
  const Gameboard = ["", "", "", "", "", "", "", "", ""];
  const cellsParent = document.querySelector(".cells");
  const cells = document.querySelectorAll(".cell");
  const actualWins = [];
  // the function checks if the array has any of the following combinations:
  // [1,2,3]
  // [4,5,6]
  // [7,8,9]
  // [3,5,7]
  // [1,5,9]
  // [1,4,7]
  // [2,5,8]
  // [3,6,9]
  const check = function (board) {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6] // diagonal
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        actualWins.push(a, b, c);
        cells[a].classList.add("won");
        cells[b].classList.add("won");
        cells[c].classList.add("won");
        rematchOption();
        return true;
      }
    }

    return false;
  };

  const turnInp = (function () {
    // loop through the cells nodeList and listen for the click event and when the cell is clicked, the innerText of the cell is set to the turn and then the index of the element in the children elements of the .cells parents element is set to its order and then the same index is assigned a value in the Gameboard array and then the winning patterns are checked and then the player is then flipped
    cells.forEach((El) => {
      El.addEventListener("click", () => {
        El.innerText = playerTurn;
        const index = Array.prototype.indexOf.call(cellsParent.children, El);
        Gameboard[index] = playerTurn;
        check(Gameboard);
        playerTurn = playerTurn === "O" ? "X" : "O";
      });
    });
  })();
  const rematch = function () {
    Gameboard.forEach((el) => (Gameboard[Gameboard.indexOf(el)] = ""));
    playerTurn = "X";
    cells.forEach((El) => {
      El.innerText = "";
    });
  };

  const rematchOption = function () {
    const rematchBtn = document.createElement("button");
    rematchBtn.textContent = "Rematch ?";
    document.querySelector(".tic-tac-toe").appendChild(rematchBtn);
    rematchBtn.addEventListener("click", () => {
      rematch();
      rematchBtn.style.display = "none";
      cells[actualWins[0]].classList.remove("won");
      cells[actualWins[1]].classList.remove("won");
      cells[actualWins[2]].classList.remove("won");
    });
  };

  return {
    Gameboard,
    check,
    turnInp
  };
})();
