const turn = document.querySelector(".turn-indicator");

// Main Board
const GameBoard = (() => {
  let gameBoard = Array(9).fill("");

  const render = () => {
    let boardHTML = "";

    gameBoard.forEach((square, index) => {
      boardHTML += `<button class="square" id="square-${index}" data-index = "${index}">${square}</button>`;
      document.querySelector("#gameboard").innerHTML = boardHTML;
    });
  };

  const placeMark = (cell, mark, players) => {
    cell.innerHTML = mark;
    cell.classList.add(mark);
  };

  return {
    render,
    placeMark,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

// Main Game Logic
const Game = (() => {
  let players = [];
  let gameOver;

  let currentPlayerIndex = 0;

  // Win Conditions
  const winConditions = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  let options = Array(9).fill("");

  // Initialize Game
  const start = () => {
    options = Array(9).fill("");
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    currentMark = players[currentPlayerIndex].mark;

    turn.textContent = `${players[currentPlayerIndex].mark}: ${players[currentPlayerIndex].name}'s Turn`;

    gameOver = false;

    GameBoard.render();

    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  // Handle Click
  const handleClick = (event) => {
    const square = event.target;
    const cell = options[square.dataset.index];

    if (cell !== "") {
      return;
    }
    options[square.dataset.index] = currentMark;
    GameBoard.placeMark(square, currentMark, players);
    Game.checkWinner();
    // Game.checkDraw();
    Game.switchPlayer();
  };

  const checkWinner = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }

      if (cellA == cellB && cellB == cellC && cellC == cellA) {
        gameOver = true;
        turn.textContent = `${players[currentPlayerIndex].name} won`
      }
    }
  };

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex == 0 ? 1 : 0;
    currentMark = players[currentPlayerIndex].mark;
    turn.textContent = `${players[currentPlayerIndex].mark}: ${players[currentPlayerIndex].name}'s Turn`;
  };

  const showOptions = () => console.log(options);

  return {
    start,
    handleClick,
    switchPlayer,
    checkWinner,

    showOptions,
  };
})();

// Start
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});
