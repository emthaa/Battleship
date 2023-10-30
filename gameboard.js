class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = this.createGameboard();
    this.missedShots = []
  }

  createGameboard() {
    const gameboardCellArray = [];
    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(false);
      }
      gameboardCellArray.push(row);
    }
    return gameboardCellArray;
  }

  isPlacement(x,y,length,isVertical){

    if(isVertical){
      if(y+length > this.size){
        return false
      }else{
        return true
      }
    }else{
      // horizontal
      if(x+length > this.size){
        return false
      }else{
        return true
      }
    }
  }

  placeShipHead(x, y, ship,isVertical) {
    // Logic to place a ship's head on the game board
    // You'd need to consider the ship's length, orientation, and validity of the placement
    // Here, you might modify the gameboardCellArray to represent the ship's presence.

    if(this.isPlacement(x,y,ship.length,isVertical) == false){
      return false
    }
      

    if(isVertical == true){
      for(let i = 0;i<ship.length;i++){
        this.board[x][y+i] = ship
      }

    }else{
      for(let i = 0;i<ship.length;i++){
        this.board[x+i][y] = ship
      }
    }
    

  }

  receiveAttack(x, y) {
    // Check if the attack hits a ship or not
    
    if (this.board[x][y] === false) {
      //  records the coordinates of the missed shot.
      
      this.board[x][y] = true

      const missedCoordinates = {
        x: x,
        y: y,
      }

      this.missedShots.push(missedCoordinates)
      return 'Miss!';
    } else {
      // sends the ‘hit’ function to the correct ship,

        this.board[x][y].hit()
        this.board[x][y] = true

        return 'Hit!!'
    }
  }

 
}

// Example usage

module.exports = Gameboard;
