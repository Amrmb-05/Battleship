import { renderBoard } from "./dom";
import { computer, playerOne, gameController } from "./game";
import drag from "./drag";

renderBoard(playerOne.playerBoard.board);
// renderBoard(computer.playerBoard.board);

function getDraggedOverElements(element, x) {
  const result = [];
  const box = element.getBoundingClientRect();
  const elementWidth = box.width;
  const numberOfBoxes = Math.floor(elementWidth / 25);
  console.log(numberOfBoxes);
  const mousePosition = x - box.x;
  console.log(elementWidth);
  console.log(mousePosition);
  const boxNumber = Math.ceil(mousePosition / 25);
  console.log(boxNumber);
  for (let i = 1; i < numberOfBoxes + 1; i += 1) {
    if (i !== boxNumber) {
      result.push(i - boxNumber);
    }
  }
  return result;
}

const getDropTargetsVerticalPosition = (element, y) => {
  const result = [];
  const box = element.getBoundingClientRect();
  const elementHeight = box.height;
  const numberOfBoxes = Math.floor(elementHeight / 25);
  console.log(numberOfBoxes);
  const mousePosition = y - box.y;
  const boxNumber = Math.ceil(mousePosition / 25);
  for (let i = 1; i < numberOfBoxes + 1; i += 1) {
    if (i !== boxNumber) {
      result.push(10 * (i - boxNumber));
    }
  }
  console.log(result);
  return result;
};
const draggable = document.querySelector(".draggable");
let result;
draggable.addEventListener("mousedown", (e) => {
  result = getDropTargetsVerticalPosition(draggable, e.clientY);
});

const cells = document.querySelectorAll(".player-1 TD");
console.log(cells);
function drop(e) {
  for (const num of result) {
    let cord = String(Number(e.target.dataset.cords) + num);
    cord = cord.length === 1 ? `0${cord}` : cord;
    const cell = document.querySelector(`[data-cords="${cord}"]`);
    cell.classList.add("ship");
  }
  e.target.classList.add("ship");
  const min =
    result[0] < 0
      ? String(result[0] + Number(e.target.dataset.cords))
      : e.target.dataset.cords;
  playerOne.playerBoard.placeShip(
    Number(min[0]),
    Number(min[1]),
    "horizontal",
    result.length + 1,
  );
  console.log(playerOne.playerBoard.board);
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
  //   setTimeout(() => {
  //     e.target.classList.add("hide");
  //   }, 0);
  const draggable = document.querySelector(".draggable");
  // draggable.addEventListener("mousedown", (event) => {
  //   getDraggedOverElements(draggable, event.clientX);
  // });
}

const item = document.getElementById("submarine");

console.log(item);
item.addEventListener("dragstart", dragStart);
item.addEventListener("dragend", item.classList.remove("dragging"));

function dragOver(e) {
  e.preventDefault();
  // const draggable = document.querySelector(".dragging");
  //   const box = draggable.getBoundingClientRect();
  //   console.log(box);

  // console.log("e.target");

  // console.log(e.target.getBoundingClientRect());
  e.target.classList.add("drag-over");
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
  // const draggable = document.querySelector(".dragging");
  // const box = draggable.getBoundingClientRect();
  // console.log(box);
  console.log("enter");
}

cells.forEach((cell) => {
  cell.addEventListener("dragenter", dragEnter);

  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", drop);
});

// gameController();
