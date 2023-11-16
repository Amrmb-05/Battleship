import { renderBoard } from "./dom";
import { computer, playerOne, gameController } from "./game";
import * as drag from "./drag";

renderBoard(playerOne.playerBoard.board);

const startBtn = document.querySelector(".start-game");
startBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hide");
  renderBoard(computer.playerBoard.board);
  gameController();
});

const ships = document.querySelectorAll(".draggable");
let result;
ships.forEach((ship) => {
  ship.addEventListener("mousedown", (e) => {
    result = ship.classList.contains("vertical")
      ? drag.getDropTargetsVerticalPosition(ship, e.clientY)
      : drag.getDropTargetsHorizontalPosition(ship, e.clientX);
  });
});

const cells = document.querySelectorAll(".player-1 TD");

ships.forEach((ship) => {
  ship.addEventListener("dragstart", drag.dragStart);
  ship.addEventListener("dragend", drag.dragEnd);
  ship.addEventListener("mousedown", (e) => {
    e.target.parentNode.classList.add("dragging");
  });
  ship.addEventListener("mouseup", (e) => {
    e.target.parentNode.classList.remove("dragging");
  });
});
cells.forEach((cell) => {
  cell.addEventListener("dragenter", drag.dragEnter);
  cell.addEventListener("dragover", drag.dragOver);
  cell.addEventListener("drop", (e) => {
    drag.drop(e, result);
    let position;
    if (result[0] >= 10) {
      position = "vertical";
    } else {
      position = "horizontal";
    }
    const min =
      result[0] < 0
        ? String(result[0] + Number(e.target.dataset.cords))
        : e.target.dataset.cords;
    playerOne.playerBoard.placeShip(
      Number(min[0]),
      Number(min[1]),
      position,
      result.length + 1,
    );
    const ships = document.querySelectorAll(".draggable");
    if (ships.length === 0) {
      startBtn.disabled = false;
    }
  });
});

const restartBtn = document.querySelector(".restart");
// eslint-disable-next-line no-restricted-globals
restartBtn.addEventListener("click", () => location.reload());
