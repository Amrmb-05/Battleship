import { experiments } from "webpack";
import Player from "./src/player";

let ship;
let player;
let playerTwo;
beforeEach(() => {
  player = new Player("Amr");
  playerTwo = new Player("Lufy");
  ship = playerTwo.playerBoard.placeShip(3, 5, "horizontal", 3);
});

test("Register a hit if coordinates contain ship", () => {
  player.attack(3, 5, playerTwo.playerBoard);
  expect(ship.noOfHits).toBe(1);
});

describe("Computer makes a random move", () => {
  test("move is registerd in the board", () => {
    const cords = player.randomMove(playerTwo.playerBoard);
    const x = cords[0];
    const y = cords[1];

    expect(["hit", "miss"]).toContain(playerTwo.playerBoard.board[x][y]);
  });
  test.only("make another move if the coordinates were already attacked", () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        player.playerBoard.board[i][j] = "miss";
      }
    }
    player.playerBoard.placeShip(1, 0, "horizontal", 1);
    player.randomMove(player.playerBoard);
    expect(player.playerBoard.board[1][0]).toBe("hit");
  });
});
