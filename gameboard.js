class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = this.createGameboard();
    this.squaresShot = []
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

  isPlacement(x, y, length, isVertical) {
    if (isVertical) {
      if (y + length > this.size) {
        return false; // Check if the ship goes off the board vertically
      }
  
      for (let i = 0; i < length; i++) {
        if (x >= this.size || y + i >= this.size || this.board[x][y + i] !== false) {
          return false; // Check for overlap or out-of-bounds vertically
        }
      }
      return true;
    } else {
      if (x + length > this.size) {
        return false; // Check if the ship goes off the board horizontally
      }
  
      for (let i = 0; i < length; i++) {
        if (x + i >= this.size || y >= this.size || this.board[x + i][y] !== false) {
          return false; // Check for overlap or out-of-bounds horizontally
        }
      }
      return true;
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
    
    return true

  }

  receiveAttack(x, y) {
    // Check if the attack hits a ship or not
    
    if (this.board[x][y] === false) {
      //  records the coordinates of the missed shot.
      
      this.board[x][y] = true

      const squareCoordinates = {
        x: x,
        y: y,
      }

      this.squaresShot.push(squareCoordinates)
      return 'Miss!';
    } else {
      // sends the ‘hit’ function to the correct ship,

        this.board[x][y].hit()
        this.board[x][y] = true
        const squareCoordinates = {
          x: x,
          y: y,
        }
  
        this.squaresShot.push(squareCoordinates)
        return 'Hit!!'
    }
  }

  randomAttack(){

    while (true){
      let randX = Math.floor(Math.random() * this.size);
      let randY = Math.floor(Math.random() * this.size);

      if(this.squaresShot == []){ //if no shots hit yet
        this.receiveAttack(randX,randY)
      }

      for(let i = 0; i < this.squaresShot.length;i++){ //check the squares that have been shot and compare to rand 
        if(this.squaresShot[i].x == randX || this.squaresShot[i].y == randY){
          break
        }else{
          this.receiveAttack(randX,randY)
        }

      }

    }

  }

  printBoard(){
    for (let i = 0; i < this.size; i++) {
      console.log('\n')
      for (let j = 0; j < this.size; j++) {
        console.log(this.board[i][j]) 
      }
    }
  }
}


module.exports = Gameboard;
