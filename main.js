// main game loop

const ship = require('./ship')
const gameboard = require('./gameboard')
const player = require('./player')

const playerBoard = new gameboard(10)
const computerBoard = new gameboard(10)

const playerShipOne = new ship(5)
const playerShipTwo = new ship(4)
const playerShipThree = new ship(3)
const playerShipFour = new ship(3)
const playerShipFive = new ship(2)

const computerShipOne = new ship(5)
const computerShipTwo = new ship(4)
const computerShipThree = new ship(3)
const computerShipFour = new ship(3)
const computerShipFive = new ship(2)

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

while (isGameOver == false){

    

}
