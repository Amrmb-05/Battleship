import Player from "./player";
import takeinput from "./dom";

const playerOne = new Player();
const computer = new Player();

const playerOneBoard = playerOne.playerBoard;
const computerBoard = computer.playerBoard;

computerBoard.placeShip(0, 0, "horizontal", 3);
computerBoard.placeShip(3, 8, "horizontal", 5);
computerBoard.placeShip(7, 2, "horizontal", 6);
computerBoard.placeShip(1, 4, "horizontal", 1);

playerOneBoard.placeShip(5, 3, "horizontal", 3);
playerOneBoard.placeShip(8, 3, "horizontal", 5);
playerOneBoard.placeShip(8, 7, "horizontal", 1);
playerOneBoard.placeShip(3, 3, "horizontal", 6);

let turnsPlayed = 0;
const currentPlayer = playerOneBoard;
while (turnsPlayed < 6) {
  takeinput(currentPlayer);
  setTimeout(() => {
    computer.randomMove();
  }, 2000);
  turnsPlayed += 1;
}

export { playerOne, computer };
