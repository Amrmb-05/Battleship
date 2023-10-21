import Gameboard from "./gameBoard";

export default class Player {
  enemyBoard = new Gameboard();

  attack(x, y) {
    this.enemyBoard.receiveAttack(x, y);
  }
}
