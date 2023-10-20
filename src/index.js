export default class Ship {
  constructor(length) {
    this.length = length;
    this.noOfHits = 0;
    this.sunk = false;
  }

  hit() {
    this.noOfHits += 1;
  }

  isSunk() {
    if (this.length === this.noOfHits) this.sunk = true;
  }
}
