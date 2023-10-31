import Ship from './ship.js'
import Gameboard from './gameboard.js'


// main game loop


const playerBoard = new Gameboard(10)
const computerBoard = new Gameboard(10)

const playerShipOne = new Ship(5)
const playerShipTwo = new Ship(4)
const playerShipThree = new Ship(3)
const playerShipFour = new Ship(3)
const playerShipFive = new Ship(2)

const computerShipOne = new Ship(5)
const computerShipTwo = new Ship(4)
const computerShipThree = new Ship(3)
const computerShipFour = new Ship(3)
const computerShipFive = new Ship(2)

playerBoard.placeShipHead(0,0,playerShipOne,true)
playerBoard.placeShipHead(1,0,playerShipTwo,true)
playerBoard.placeShipHead(2,0,playerShipThree,true)
playerBoard.placeShipHead(3,0,playerShipFour,true)
playerBoard.placeShipHead(4,0,playerShipFive,true)

computerBoard.placeShipHead(5,0,computerShipOne,true)
computerBoard.placeShipHead(6,0,computerShipTwo,true)
computerBoard.placeShipHead(7,0,computerShipThree,true)
computerBoard.placeShipHead(8,0,computerShipFour,true)
computerBoard.placeShipHead(9,0,computerShipFive,true)

let isGameOver = false

playerBoard.loadDOMboard(document.querySelector('#friendly-gameboard'))
computerBoard.loadDOMboard(document.querySelector('#enemy-gameboard'))

// create DOM board based off info from gameboard

// while (isGameOver == false){




// }
