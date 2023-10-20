export default class Ship {
  constructor(length) {
    this.length = length;
    this.noOfHits = 0;
    this.isSunk = false;
  }

  hit() {
    this.noOfHits += 1;
  }
}
