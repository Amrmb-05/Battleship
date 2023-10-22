import { playerOneBoard } from "./game";

console.log(playerOneBoard);
function renderBoard(arr) {
  const container = document.getElementById("container");
  const table = document.createElement("table");
  container.appendChild(table);

  for (let i = 0; i < arr.length; i += 1) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    // document.appendChild;
    for (let j = 0; j < arr.length; j += 1) {
      const td = document.createElement("td");
      td.innerText = "k";
      tr.appendChild(td);
    }
  }
}

renderBoard(playerOneBoard.board);
