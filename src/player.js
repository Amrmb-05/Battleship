import Gameboard from "./gameBoard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new Gameboard();
  }

  attack(x, y, enemyBoard) {
    enemyBoard.receiveAttack(x, y);
  }

  randomMove(opponent) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (opponent.board[x][y] === "hit" || opponent.board[x][y] === "miss") {
      this.randomMove(opponent);
    }
    this.attack(x, y, opponent);
    return [x, y];
  }
}
