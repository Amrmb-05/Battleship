import Ship from ".";

export default class Gameboard {
  constructor() {
    this.grid = [];
    for (let i = 0; i < 10; i += 1) {
      this.grid[i] = [];
      for (let j = 0; j < 10; j += 1) {
        this.grid[i][j] = j;
      }
    }
  }
}
