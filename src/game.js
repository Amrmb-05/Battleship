import Player from "./player";
import { displayWinner } from "./dom";

const playerOne = new Player("Amr");
const computer = new Player("Computer");
const playerOneBoard = playerOne.playerBoard;
const computerBoard = computer.playerBoard;
let winnerFound = false;

computerBoard.populate();
// computerBoard.placeShip(0, 0, "horizontal", 3);
// computerBoard.placeShip(3, 8, "horizontal", 5);
// computerBoard.placeShip(7, 2, "horizontal", 6);
// computerBoard.placeShip(1, 4, "horizontal", 1);

// playerOneBoard.placeShip(0, 0, "vertical", 4);
// playerOneBoard.placeShip(2, 3, "horizontal", 5);
// playerOneBoard.placeShip(8, 7, "horizontal", 1);
// playerOneBoard.placeShip(3, 3, "horizontal", 6);

function isGameOver() {
  if (playerOne.playerBoard.allSunk() === true) {
    winnerFound = computer;
    return true;
  }
  if (computer.playerBoard.allSunk() === true) {
    winnerFound = playerOne;
    console.log(winnerFound);
    return true;
  }
  return false;
}

function gameLoop(event) {
  const computerGrid = document.querySelector(".player-2");
  const restartBtn = document.querySelector(".restart");
  if (event.target.tagName === "TD") {
    playerOne.attack(
      event.target.dataset.cords[0],
      event.target.dataset.cords[1],
      computer.playerBoard,
    );
    event.target.classList.add(
      `${
        computerBoard.board[event.target.dataset.cords[0]][
          event.target.dataset.cords[1]
        ]
      }`,
    );
    if (isGameOver() === true) {
      displayWinner(winnerFound);
      computerGrid.removeEventListener("click", gameLoop);
      restartBtn.classList.toggle("hide");
      return;
    }
    console.log(`Computer: ${computer.playerBoard}`);
  }
  setTimeout(() => {
    const attackedCoords = computer.randomMove(playerOne.playerBoard);
    console.log(playerOneBoard.board[attackedCoords[0]][attackedCoords[1]]);
    console.log(attackedCoords);
    const attackedCell = document.querySelector(
      `[data-cords="${attackedCoords[0]}${attackedCoords[1]}"]`,
    );
    attackedCell.classList.add(
      `${playerOneBoard.board[attackedCoords[0]][attackedCoords[1]]}`,
    );
    if (isGameOver() === true) {
      displayWinner(winnerFound);
      computerGrid.removeEventListener("click", gameLoop);
      restartBtn.classList.toggle("hide");
    }
  }, 1000);
}
function gameController() {
  const computerGrid = document.querySelector(".player-2");

  computerGrid.addEventListener("click", gameLoop);
}

export { playerOne, computer, gameController, isGameOver };
