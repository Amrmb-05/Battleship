import { renderBoard } from "./dom";
import { computer, playerOne, gameController } from "./game";
import * as drag from "./drag";

renderBoard(playerOne.playerBoard.board);
renderBoard(computer.playerBoard.board);

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
// function drop(e) {
//   for (const num of result) {
//     let cord = String(Number(e.target.dataset.cords) + num);
//     cord = cord.length === 1 ? `0${cord}` : cord;
//     const cell = document.querySelector(`[data-cords="${cord}"]`);
//     cell.classList.add("ship");
//   }
//   e.target.classList.add("ship");
//   const min =
//     result[0] < 0
//       ? String(result[0] + Number(e.target.dataset.cords))
//       : e.target.dataset.cords;
//   playerOne.playerBoard.placeShip(
//     Number(min[0]),
//     Number(min[1]),
//     "horizontal",
//     result.length + 1,
//   );
//   console.log(playerOne.playerBoard.board);
// }

// const ships = document.querySelectorAll(".draggable");
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
  });
});

// gameController();
