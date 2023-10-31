// create player's gameboard
const gameboard = require('./gameboard')

class Player{
    constructor(name,size){
        this.name = name
        this.board = new gameboard(size)
    }

}

module.exports = Player;