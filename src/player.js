import Gameboard from "./gameBoard";
import Ship from "./index";

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new Gameboard();
  }

  attack(x, y, enemyBoard) {
    enemyBoard.receiveAttack(x, y);
  }

  randomMove(opponent) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (opponent.board[x][y] === "hit" || opponent.board[x][y] === "miss") {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    this.attack(x, y, opponent);
    return [x, y];
  }
}
