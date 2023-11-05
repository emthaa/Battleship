
export default class Gameboard {
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
  
        // Check neighboring squares for ships
        if ((x > 0 && this.board[x - 1][y + i]) || (x < this.size - 1 && this.board[x + 1][y + i])) {
          return false; // Check left and right neighboring squares
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
  
        // Check neighboring squares for ships
        if ((y > 0 && this.board[x + i][y - 1]) || (y < this.size - 1 && this.board[x + i][y + 1])) {
          return false; // Check upper and lower neighboring squares
        }
      }
      return true;
    }
  }
  
  
  placeShipHead(x, y, ship,isVertical) {
    // Logic to place a ship's head on the game board

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
      
      this.board[x][y] = 'missed'

      const squareCoordinates = {
        x: x,
        y: y,
      }

      this.squaresShot.push(squareCoordinates)
      return 'Miss!';
    } else {
      // sends the ‘hit’ function to the correct ship,

        this.board[x][y].hit()
        this.board[x][y] = 'hit'
        const squareCoordinates = {
          x: x,
          y: y,
        }
  
        this.squaresShot.push(squareCoordinates)
        return 'Hit!!'
    }
  }

  randomAttack() {
    if (this.squaresShot.length === this.size * this.size) {
      return; // All squares have been shot
    }
  
    let randX, randY;
    do {
      randX = Math.floor(Math.random() * this.size);
      randY = Math.floor(Math.random() * this.size);
    } while (this.isSquareAlreadyShot(randX, randY));
  
    this.receiveAttack(randX, randY);
  }
  
  isSquareAlreadyShot(x, y) {
    for (let i = 0; i < this.squaresShot.length; i++) {
      if (this.squaresShot[i].x === x && this.squaresShot[i].y === y) {
        return true; // Square has already been shot
      }
    }
    return false; // Square has not been shot
  }
  
  


  checkGameOver() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.board[x][y] !== false && this.board[x][y] !== 'hit' && this.board[x][y] !== 'missed') {
          return false; // A non-empty cell that is not a hit or missed is a ship
        }
      }
    }
    return true; // No remaining ships found, game is over
  }
  

  clearDOMboard(board){
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
  }

  loadDOMboard(container,showShip){
    for(let y = 0; y < this.size; y++){
      for(let x = 0; x < this.size; x++){
        // load different pictures depending on the status of the cell
        const cell = document.createElement('div');
        container.appendChild(cell);
        
        if(this.board[x][y] === 'missed'){
          cell.className = 'cell-missed';
        } else if(this.board[x][y] === 'hit'){
          cell.className = 'cell-hit';
        } else if(this.board[x][y] === false){
          cell.className = 'cell';
        }else{
          if(showShip == true){
            cell.className = 'cell-ship'
          }else{
            cell.className = 'cell';
          }
        }
      }
    }
  }

  giveBoardCellsEvent(DOMboard,enemyBoard,enemyDOMboard) { //main DOM loop
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const cellIndex = y * this.size + x; // Calculate the index of the cell
        const cell = DOMboard.children[cellIndex];

        // 
  
        if (!cell.classList.contains('cell-hit') && !cell.classList.contains('cell-missed')) {
          cell.addEventListener('click', () => {
            this.receiveAttack(x, y); // Trigger the attack at the specific coordinates
            this.clearDOMboard(DOMboard);
            this.loadDOMboard(DOMboard, false); //refresh board to show hit
            
             // give same event to new made cells
            // computer attacks enemyboard\
            enemyBoard.randomAttack() 
            enemyBoard.clearDOMboard(enemyDOMboard)
            enemyBoard.loadDOMboard(enemyDOMboard,true)
            
            if(this.checkGameOver() || enemyBoard.checkGameOver()){
              console.log('gameover')
            }
            

            this.giveBoardCellsEvent(DOMboard,enemyBoard,enemyDOMboard);

            
            // 
          });
        }
      }
    }
  }
  
  
}

