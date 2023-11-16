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
      tr.appendChild(td);
    }
  }
}

function displayWinner(winner) {
  const winnerDisplay = document.querySelector(".winner-display");
  const winnerMessage = document.createElement("h2");
  winnerDisplay.insertBefore(winnerMessage, winnerDisplay.firstChild);
  winnerMessage.textContent = `${winner.name} is the Winner!`;
}
const ships = document.querySelectorAll(".draggable");
ships.forEach((ship) => {
  ship.addEventListener("click", () => {
    ship.classList.toggle("vertical");
  });
});

export { renderBoard, displayWinner };
