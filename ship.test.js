const Ship = require('./ship.js');

test('battleship testing', () => {
  const slop = new Ship(2);

  expect(slop.isSunk()).toBe(false); // Initial state

  slop.hit();
  expect(slop.isSunk()).toBe(false); // One hit, not sunk

  slop.hit();
  expect(slop.isSunk()).toBe(true); // Two hits, ship is sunk
});
