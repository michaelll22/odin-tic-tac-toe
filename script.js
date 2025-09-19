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

  // ------------------
  // BUTTONS AND INPUTS
  // ------------------
  const startBtn = document.querySelector("#start-button");
  const restartBtn = document.querySelector("#restart-button");
  const resetBtn = document.querySelector("#reset-button");
  restartBtn.style.display = "none";
  resetBtn.style.display = "none";

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

  // --------------------
  // START AND RESET BTN
  // --------------------

  startBtn.addEventListener("click", () => {
    // if (playerOne.value && playerTwo.value) {
    startBtn.style.display = "none";
    ScreenController.hideUI(false);
    createPlayers();
    resetBoard();
    restartBtn.style.display = "";
    resetBtn.style.display = "";

    // }
  });

  restartBtn.addEventListener("click", () => {
    resetGame();
    ScreenController.hideUI(true);
    restartBtn.style.display = "none";
    startBtn.style.display = "";
    resetBtn.style.display = "none";

    ScreenController.getGameInfo("Enter player names");
  });

  resetBtn.addEventListener("click", () => {
    resetBoard();
  });

  const resetBoard = () => {
    gameRunning = true;
    winner = false;
    draw = false;
    currentPlayer = players[0];
    GameBoard.getCells().fill("");
    ScreenController.render(currentPlayer);
  };

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

  // CHECK WINNER
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

  // CHECK DRAW
  const checkDraw = () => {
    const cells = GameBoard.getCells();
    console.log(cells);

    if (!cells.includes("")) {
      draw = true;
    }
  };

  //-------------------------
  //RESET (****INCOMPLETE****)
  //-------------------------
  const resetGame = () => {
    gameRunning = false;
    winner = false;
    currentPlayer = players[0];
    ScreenController.removeBoard();

    playerOne.value = "";
    playerTwo.value = "";
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
  const board = document.querySelector("#game-board");
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

    if (GameController.getWinner()) {
      info.textContent = `${player.mark}: ${player.name} wins`;
    } else if (GameController.getDraw()) {
      info.textContent = `DRAW!`;
    } else {
      info.textContent = `${player.mark}: ${player.name}'s Turn`;
    }
  };

  const getInfo = () => info;

  const getGameInfo = (text) => (info.textContent = `${text}`);

  const getButton = (button) => {
    return button;
  };

  const removeBoard = () => {
    GameBoard.getCells().fill("");
    const board = document.getElementById("game-board");
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
  };

  const hideUI = (display) => {
    const inputs = document.querySelectorAll("input");
    display = display == true ? "inline-block" : "none";
    inputs.forEach((input) => (input.style.display = display));
  };

  return {
    render,
    getInfo,
    removeBoard,
    hideUI,
    getGameInfo,
  };
})();
