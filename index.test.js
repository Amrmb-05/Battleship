import Ship from "./src";

test("increase noOfHits in a ship", () => {
  const newShip = new Ship(2);
  newShip.hit();
  expect(newShip.noOfHits).toBe(1);
});

test("check if ship is sunk", () => {
  const newShip = new Ship(2);
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});
