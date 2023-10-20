import Ship from "./src";

test("increas noOfHits in a ship", () => {
  const newShip = new Ship(2);
  newShip.hit();
  expect(newShip.noOfHits).toBe(1);
});
