import Ship from "./src";
import Gameboard from "./src/gameBoard";
import Player from "./src/player";

let ship;
let newGame;
let player;
beforeEach(() => {
  player = new Player();
  ship = player.enemyBoard.placeShip(3, 5, "horizontal", 3);
});
test("Register a hit if coordinates contain ship", () => {
  player.attack(3, 5);
  expect(ship.noOfHits).toBe(1);
});
