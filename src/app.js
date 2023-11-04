import { renderBoard } from "./dom";
import { computer, playerOne, gameController } from "./game";
import * as drag from "./drag";

renderBoard(playerOne.playerBoard.board);
// renderBoard(computer.playerBoard.board);

const draggable = document.querySelector(".draggable");
let result;
draggable.addEventListener("mousedown", (e) => {
  console.log(draggable);
  result = draggable.classList.contains("vertical")
    ? drag.getDropTargetsVerticalPosition(draggable, e.clientY)
    : drag.getDropTargetsHorizontalPosition(draggable, e.clientX);
});

const cells = document.querySelectorAll(".player-1 TD");
console.log(cells);
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

const item = document.getElementById("submarine");

console.log(item);
item.addEventListener("dragstart", drag.dragStart);
item.addEventListener("dragend", item.classList.remove("dragging"));

cells.forEach((cell) => {
  cell.addEventListener("dragenter", drag.dragEnter);
  cell.addEventListener("dragover", drag.dragOver);
  cell.addEventListener("drop", (e) => {
    drag.drop(e, result);
  });
});

// gameController();
