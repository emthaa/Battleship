const Gameboard = require('../factories/gameboard.js')

test('gameboard testing',()=>{
  const g = new Gameboard(10)
  expect(g.createGameboard()[62]).toBe(64)


  
})