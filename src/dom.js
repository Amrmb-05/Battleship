import Ship from ".";

const container = document.getElementById("container");
function renderBoard(arr) {
  const table = document.createElement("table");
  const player = container.childNodes.length;
  table.classList.add(`player-${player + 1}`);

  container.appendChild(table);

  for (let i = 0; i < arr.length; i += 1) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < arr.length; j += 1) {
      const td = document.createElement("td");
      td.dataset.cords = `${i}${j}`;
      if (arr[i][j] instanceof Ship) td.classList.add("ship");
      // if (arr[i][j] === "hit") td.classList.add("hit");
      // if (arr[i][j] === "miss") td.classList.add("miss");
      tr.appendChild(td);
    }
  }
}

function displayWinner(winner) {
  const winMessage = document.querySelector(".winner-display");
  winMessage.textContent = `${winner.name} is the Winner!`;
}

// const cells = document.querySelector(".player 1 TD");
// console.log(cells);
// function drop(e) {
//   const id = e.dataTransfer.getData("text/plain");
//   const draggable = document.getElementById(id);
//   e.target.replaceWith(draggable);
// }

// function dragOver(e) {
//   e.preventDefault();
// }

// function dragEnter(e) {
//   e.preventDefault();
//   console.log("enter");
// }
// cells.forEach((cell) => {
//   cell.addEventListener("dragEnter", dragEnter);
//   cell.addEventListener("dragOver", dragOver);
//   cell.addEventListener("drop", drop);
// });

export { renderBoard, displayWinner };
