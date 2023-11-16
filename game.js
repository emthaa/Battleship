import Ship from './factories/ship.js'
import Gameboard from './factories/gameboard.js'


const playerBoard = new Gameboard(10)
const computerBoard = new Gameboard(10)

const playerShipOne = new Ship(5)
const playerShipTwo = new Ship(4)
const playerShipThree = new Ship(3)
const playerShipFour = new Ship(3)
const playerShipFive = new Ship(2)

const pShipArr = [playerShipOne,playerShipTwo,playerShipThree,playerShipFour,playerShipFive]


const computerShipOne = new Ship(5)
const computerShipTwo = new Ship(4)
const computerShipThree = new Ship(3)
const computerShipFour = new Ship(3)
const computerShipFive = new Ship(2)

const cShipArr = [computerShipOne,computerShipTwo,computerShipThree,computerShipFour,computerShipFive]

// playerBoard.placeShipHead(0,0,playerShipOne,true)
// playerBoard.placeShipHead(2,0,playerShipTwo,true)
// playerBoard.placeShipHead(4,0,playerShipThree,true)
// playerBoard.placeShipHead(6,9,playerShipFour,false)
// playerBoard.placeShipHead(8,0,playerShipFive,false)

// playerBoard.placeShipsRandomly(pShipArr)

// computerBoard.placeShipHead(5,0,computerShipOne,true)
// computerBoard.placeShipHead(7,0,computerShipTwo,true)
// computerBoard.placeShipHead(9,0,computerShipThree,true)
// computerBoard.placeShipHead(1,0,computerShipFour,true)
// computerBoard.placeShipHead(3,0,computerShipFive,true)

computerBoard.placeShipsRandomly(cShipArr)

// player chooses where ship goes
// computer places ships randomly on its side
// V V V V V V V V V V V V V V V V V V V V V
// playerBoard.placeShipsRandomly(pShipArr)
playerBoard.loadDOMboard(document.querySelector('#friendly-gameboard'),true)
computerBoard.loadDOMboard(document.querySelector('#enemy-gameboard'),false)

playerBoard.shipSelectionHandlerDOM(pShipArr,document.querySelector('#friendly-gameboard'),computerBoard)

// VVV dont call function until all ships are placed down

// computerBoard.giveBoardCellsGame(document.querySelector('#enemy-gameboard'),playerBoard, document.querySelector('#friendly-gameboard'))



// function DOMshipSelection takes in ship array
// 


// smooth code out with GPT 4