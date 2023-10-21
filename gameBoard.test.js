import Ship from "./src";
import Gameboard from "./src/gameBoard";

let newGame;
let ship;
describe("places ship in the specified coordinates and direction", () => {
  beforeEach(() => {
    newGame = new Gameboard();
    ship = new Ship(2);
  });
  test("places ship in the specified coordinates horizontally", () => {
    newGame.placeShip(2, 2, "horizontal", 2);
    expect(newGame.board[2][2]).toEqual(ship);
    expect(newGame.board[1][2]).toEqual(ship);
  });
  test("places ship in the specified coordinates vertically", () => {
    newGame.placeShip(2, 2, "vertical", 2);
    expect(newGame.board[2][2]).toEqual(ship);
    expect(newGame.board[2][3]).toEqual(ship);
  });
});
