import { renderBoard } from "./dom";
import { computer, playerOne, gameController } from "./game";

renderBoard(playerOne.playerBoard.board);
renderBoard(computer.playerBoard.board);

gameController();
