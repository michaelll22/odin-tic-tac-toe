//------------------
// Game Board
//------------------

const GameBoard = (() => {
  const cells = Array(9).fill("");
  const getCells = () => cells;
  const setCell = (index, player) => {
    if (cells[index] === "") {
      cells[index] = player.mark;
    }
  };

  return {
    getCells,
    setCell,
  };
})();

//------------------
// Game Controller
//------------------

const GameController = (() => {
  let gameRunning = false;
  let winner = false;
  let draw = false;

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

  const startBtn = document.querySelector("#start-button");
  const restartBtn = document.querySelector("#restart-button");

  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");

  players = [
    {
      name: "",
      mark: "X",
    },

    {
      name: "",
      mark: "O",
    },
  ];

  let currentPlayer = players[0];

  startBtn.addEventListener("click", () => {
    // if (playerOne.value && playerTwo.value) {
    startBtn.style.display = "none";
    ScreenController.hideUI();

    createPlayers();
    console.log(players);

    gameRunning = true;
    winner = false;
    currentPlayer = players[0];
    GameBoard.getCells().fill("");
    ScreenController.render(currentPlayer);
    // }
  });

  restartBtn.addEventListener("click", () => {
    resetGame();
    GameBoard.getCells().fill("");
    ScreenController.render(currentPlayer);
  });

  const createPlayers = () => {
    players[0].name = playerOne.value;
    players[1].name = playerTwo.value;
  };

  const handleClick = (index) => {
    if (!gameRunning) return;

    GameBoard.setCell(index, currentPlayer);
    console.log(GameBoard.getCells());

    checkWinner();
    checkDraw();

    if (draw) {
      gameRunning = false;
    } else if (!winner) {
      switchPlayer();
    } else gameRunning = false;

    ScreenController.render(currentPlayer);
  };

  const checkWinner = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const conditions = winConditions[i];
      const cellA = GameBoard.getCells()[conditions[0]];
      const cellB = GameBoard.getCells()[conditions[1]];
      const cellC = GameBoard.getCells()[conditions[2]];

      if (cellA !== "" && cellB == cellC && cellC == cellA) {
        winner = true;
      }
    }
  };

  const checkDraw = () => {
    const cells = GameBoard.getCells();
    console.log(cells);

    if (!cells.includes("")) {
      draw = true;
    }
  };

  const resetGame = () => {
    gameRunning = false;
    winner = false;
    currentPlayer = players[0];
    ScreenController.removeBoard();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  const getWinner = () => winner;

  const getDraw = () => draw;

  return {
    handleClick,
    getCurrentPlayer,
    getWinner,
    getDraw,
    resetGame,
  };
})();

//------------------
// Screen Controller
//------------------

const ScreenController = (() => {
  const board = document.querySelector("#gameboard");
  const info = document.querySelector(".game-info");

  const render = (player) => {
    board.innerHTML = "";
    GameBoard.getCells().forEach((cell, index) => {
      const button = document.createElement("button");
      button.classList.add("cells");
      button.dataset.cellIndex = `${index}`;
      button.textContent = cell;
      button.addEventListener("click", () => {
        GameController.handleClick(index);
      });

      board.appendChild(button);
      getButton(button);
    });

    console.log(GameController.getWinner());

    if (GameController.getDraw()) {
      info.textContent = `DRAW!`;
    } else if (!GameController.getWinner() == false) {
      info.textContent = `${player.mark}: ${player.name} wins`;
    } else {
      info.textContent = `${player.mark}: ${player.name}'s Turn`;
    }
  };

  const getInfo = () => info;

  const getGameInfo = (text) => (info.textContent = `${text}`);

  const getButton = (button) => {
    return button;
  };

  const removeBoard = () => {};

  const hideUI = () => {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => (input.style.display = "none"));
  };

  return {
    render,
    getInfo,
    removeBoard,
    hideUI,
    getGameInfo,
  };
})();
