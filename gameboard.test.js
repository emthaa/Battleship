const Gameboard = require('./gameboard.js')

test('gameboard testing',()=>{
  const g = new Gameboard(8)
  expect(g.createGameboard(8)[62]).toBe(64)


  
})