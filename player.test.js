import Player from "./src/player";

let ship;
let player;
beforeEach(() => {
  player = new Player();
  ship = player.enemyBoard.placeShip(3, 5, "horizontal", 3);
});
test("Register a hit if coordinates contain ship", () => {
  player.attack(3, 5);
  expect(ship.noOfHits).toBe(1);
});

describe("Computer makes a random move", () => {
  test("move is registerd in the board", () => {
    const cords = player.randomMove();
    const x = cords[0];
    const y = cords[1];

    expect(["hit", "miss"]).toContain(player.enemyBoard.board[x][y]);
  });
});
