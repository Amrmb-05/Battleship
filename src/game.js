import Player from "./player";

const playerOne = new Player();
const computer = new Player();
export const computerBoard = playerOne.enemyBoard;
// computerBoard.placeShip(1, 5, "horizontal", 3);
// computerBoard.placeShip(3, 8, "horizontal", 5);
// computerBoard.placeShip(7, 2, "horizontal", 6);
// computerBoard.placeShip(1, 4, "horizontal", 1);

export const playerOneBoard = computer.enemyBoard;
// playerOneBoard.placeShip(5, 3, "horizontal", 3);
// playerOneBoard.placeShip(8, 3, "horizontal", 5);
// playerOneBoard.placeShip(8, 7, "horizontal", 1);
// playerOneBoard.placeShip(3, 3, "horizontal", 6);
