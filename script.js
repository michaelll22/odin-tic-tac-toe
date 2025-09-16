function CreateBoard() {
  const cells = 9;
  const board = [];

  for (let i = 0; i < cells; i++) {
    board.push(null);
  }

  const getBoard = () => board;

  return {
    getBoard,
  };
}

function renderCells() {
  const createBoard = CreateBoard();
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const turn = document.querySelector(".turn");

  const render = () => {
    const activePlayer = game.getActivePlayer();
    turn.textContent = `${activePlayer.name}'s Turn`;

    board = createBoard.getBoard();
    board.forEach((cell, index) => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");

      cellButton.dataset.cellIndex = index;
      cellButton.textContent = cell;

      boardDiv.appendChild(cellButton);
    });
  };

  render();
}

function GameController(playerOne = "p1", playerTwo = "p2") {
  const board = CreateBoard();
  let players = [
    {
      name: playerOne,
      marker: "O",
    },
    {
      name: playerTwo,
      marker: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  return {
    switchPlayer,
    getActivePlayer,
  };
}

renderCells();
