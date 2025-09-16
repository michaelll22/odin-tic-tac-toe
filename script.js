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
  const board = CreateBoard().getBoard();
  const boardDiv = document.querySelector(".board");
  const turn = document.querySelector(".turn");

  const render = () => {
    turn.textContent = `'s Turn`;
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

renderCells();
