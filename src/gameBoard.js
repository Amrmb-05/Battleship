import Ship from ".";

export default class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i += 1) {
      this.board[i] = [];
      for (let j = 0; j < 10; j += 1) {
        this.board[i][j] = j;
      }
    }
  }

  placeShip(x, y, direction, length) {
    const ship = new Ship(length);
    this.board[x][y] = ship;
    for (let i = 0; i < length; i += 1) {
      if (direction === "horizontal") {
        this.board[x - i][y] = ship;
      } else if (direction === "vertical") this.board[x][y + i] = ship;
    }
  }
}
