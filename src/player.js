import Gameboard from "./gameBoard";

export default class Player {
  enemyBoard = new Gameboard();

  attack(x, y) {
    this.enemyBoard.receiveAttack(x, y);
  }

  randomMove() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    this.attack(x, y);
    return [x, y];
  }
}
