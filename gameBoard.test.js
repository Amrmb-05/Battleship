import Ship from "./src";
import Gameboard from "./src/gameBoard";

let newGame;
let ship;
beforeEach(() => {
  newGame = new Gameboard();
});
describe("places ship in the specified coordinates and direction", () => {
  beforeEach(() => {
    ship = new Ship(2);
  });
  test("places ship in the specified coordinates horizontally", () => {
    newGame.placeShip(2, 2, "horizontal", 2);
    expect(newGame.board[2][2]).toEqual(ship);
    expect(newGame.board[2][3]).toEqual(ship);
  });
  test("places ship in the specified coordinates vertically", () => {
    newGame.placeShip(2, 2, "vertical", 2);
    expect(newGame.board[2][2]).toEqual(ship);
    expect(newGame.board[3][2]).toEqual(ship);
  });
});

describe("attacks a ship if its in the specified coordinates or records the coordinates if a shot was missed", () => {
  beforeEach(() => {
    ship = newGame.placeShip(3, 4, "horizontal", 3);
  });
  test("attacks ship in specified coordinates", () => {
    newGame.receiveAttack(3, 4);
    expect(newGame.board[3][4]).toBe("hit");
  });

  test("shot miss", () => {
    newGame.receiveAttack(4, 2);
    expect(ship.noOfHits).toBe(0);
    expect(newGame.board[4][2]).toBe("miss");
  });
});

test("returns true if all ships have been sunk", () => {
  const ship1 = newGame.placeShip(0, 0, "horizontal", 1);
  const ship2 = newGame.placeShip(1, 0, "vertical", 2);
  ship1.hit();
  ship2.hit();
  ship2.hit();
  expect(newGame.allSunk()).toBe(true);
});

test("returns false if all ships have been sunk", () => {
  const ship1 = newGame.placeShip(0, 0, "horizontal", 1);
  const ship2 = newGame.placeShip(1, 0, "vertical", 2);
  ship1.hit();
  ship2.hit();
  expect(newGame.allSunk()).toBe(false);
});
