import Ship from ".";

const container = document.getElementById("container");
export function renderBoard(arr) {
  const table = document.createElement("table");
  const player = container.childNodes.length;
  table.classList.add(`player-${player + 1}`);

  container.appendChild(table);

  for (let i = 0; i < arr.length; i += 1) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < arr.length; j += 1) {
      const td = document.createElement("td");
      td.dataset.x = i;
      td.dataset.y = j;
      if (arr[i][j] instanceof Ship) td.innerText = "ship";
      tr.appendChild(td);
    }
  }
}

export function takeinput(player) {
  container.addEventListener(
    "click",
    (event) => {
      console.log(event.target.tagName);
      if (event.target.tagName === "TD") {
        player.attack(event.target.dataset.x, event.target.dataset.y);
        console.log("attack");
        console.log(player.board);
      }
    },
    { once: true },
  );
}
