import Player from "./player";

const playerOne = new Player();
const computer = new Player();
const playerOneBoard = playerOne.playerBoard;
const computerBoard = computer.playerBoard;
let winnerFound = false;

computerBoard.placeShip(0, 0, "horizontal", 3);
// computerBoard.placeShip(3, 8, "horizontal", 5);
// computerBoard.placeShip(7, 2, "horizontal", 6);
// computerBoard.placeShip(1, 4, "horizontal", 1);

playerOneBoard.placeShip(5, 3, "horizontal", 3);
playerOneBoard.placeShip(2, 3, "horizontal", 5);
playerOneBoard.placeShip(8, 7, "horizontal", 1);
playerOneBoard.placeShip(3, 3, "horizontal", 6);

function isGameOver() {
  if (playerOne.playerBoard.allSunk() === true) {
    winnerFound = playerOne;
    return true;
  }
  if (computer.playerBoard.allSunk() === true) {
    winnerFound = computer;
    console.log(winnerFound);
    return true;
  }
  return false;
}

function gameController() {
  const computerGrid = document.querySelector(".player-2");
  computerGrid.addEventListener("click", (event) => {
    if (event.target.tagName === "TD") {
      playerOne.attack(
        event.target.dataset.x,
        event.target.dataset.y,
        computer.playerBoard,
      );
      console.log(`Computer: ${computer.playerBoard}`);
    }
    setTimeout(() => {
      computer.randomMove(playerOne.playerBoard);
      console.log(`Player 1: ${playerOne.playerBoard}`);
    }, 2000);
    if (isGameOver() === true) {
      console.log(winnerFound);
    }
  });
}

export { playerOne, computer, gameController, isGameOver };
