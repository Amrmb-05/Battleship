import { renderBoard } from "./dom";
import { computer, playerOne, gameController } from "./game";

console.log("AP");
renderBoard(playerOne.playerBoard.board);
renderBoard(computer.playerBoard.board);
const computerBoard = document.querySelector(".player-2");
const currentPlayer = playerOne;

gameController();
