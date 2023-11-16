
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
    const isCellOccupied = (row, col) => {
      return (
        row >= 0 &&
        row < this.size &&
        col >= 0 &&
        col < this.size &&
        this.board[row][col] !== false
      );
    };
  
    const checkNeighboringCells = (row, col) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (isCellOccupied(row + i, col + j)) {
            return true;
          }
        }
      }
      return false;
    };
  
    if (isVertical) {
      if (y + length > this.size) {
        return false; // Check if the ship goes off the board vertically
      }
  
      for (let i = 0; i < length; i++) {
        if (
          x >= this.size ||
          y + i >= this.size ||
          this.board[x][y + i] !== false ||
          checkNeighboringCells(x, y + i)
        ) {
          return false; // Check for overlap or out-of-bounds vertically or neighboring cells
        }
      }
      return true;
    } else {
      if (x + length > this.size) {
        return false; // Check if the ship goes off the board horizontally
      }
  
      for (let i = 0; i < length; i++) {
        if (
          x + i >= this.size ||
          y >= this.size ||
          this.board[x + i][y] !== false ||
          checkNeighboringCells(x + i, y)
        ) {
          return false; // Check for overlap or out-of-bounds horizontally or neighboring cells
        }
      }
      return true;
    }
  }
  
  placeShipHead(x, y, ship,isVertical) {
    // Logic to place a ship's head on the game board

    if(this.isPlacement(x,y,ship.shipLength,isVertical) == false){
      return false
    }
      

    if(isVertical == true){
      for(let i = 0;i<ship.shipLength;i++){
        this.board[x][y+i] = ship
      }

    }else{
      for(let i = 0;i<ship.shipLength;i++){
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
  
  
  placeShipsRandomly(shipArray) {
    for (let i = 0; i < shipArray.length; i++) {
      let shipPlaced = false;
      while (!shipPlaced) {
        const x = Math.floor(Math.random() * this.size);
        const y = Math.floor(Math.random() * this.size);
        const isVertical = Math.random() < 0.5; // Randomly choose vertical or horizontal placement
        
        if (this.placeShipHead(x, y, shipArray[i], isVertical)) {
          shipPlaced = true;
        }
      }
    }
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

  loadGameOverScreen(whoWon){
    const gameOverPopup = document.createElement('div')
    gameOverPopup.className = 'gameOverPopup'

    const headerText = document.querySelector('.header-text')
    headerText.innerHTML = `${whoWon} won the game!`

    const boards = document.querySelector('.boards')
    boards.appendChild(gameOverPopup)

}

  shipSelectionHandlerDOM(shipArray,boardDOM,enemyBoard){
    let shipArrayIndex = 0
    const showBoat = document.querySelector('.show-boat')

    for(let i = 0; i<shipArray[shipArrayIndex].shipLength;i++){ //display boat to be placed
      const cell = document.createElement('div')
      cell.className = 'cell'
      showBoat.appendChild(cell)
    }

    const makeVerticalButton = document.querySelector('.make-vertical')

    makeVerticalButton.addEventListener('click', ()=>{ //change boat display to match vertical or not
      if(makeVerticalButton.checked){
        showBoat.style.display = 'block'
      }else{
        showBoat.style.display = 'flex'
      }
    })

    const placeButton = document.querySelector('.input-cords-btn')

placeButton.addEventListener('click', () => {
  let x = parseInt(document.querySelector('#input-x').value);
  let y = parseInt(document.querySelector('#input-y').value);

  if (isNaN(x) || isNaN(y)) {
    // Handle the case where x or y is not a valid number
    return false;
    // ERROR BOX HERE <<<<<<
  }

  if(this.placeShipHead(x, y, shipArray[shipArrayIndex], makeVerticalButton.checked) == false){
    return false
    // ERROR BOX HERE <<<<<
  }
  // Refresh board
  this.clearDOMboard(boardDOM);
  this.clearDOMboard(showBoat)
  this.loadDOMboard(boardDOM, true);

  shipArrayIndex++
console.log(this)
  if(shipArrayIndex >= 5){
    const boatSelection = document.querySelector('.boat-selection')
    boatSelection.remove();
    enemyBoard.giveBoardCellsGame(document.querySelector('#enemy-gameboard'),this, document.querySelector('#friendly-gameboard'))
  }else{

  for(let i = 0; i<shipArray[shipArrayIndex].shipLength;i++){ //display boat to be placed
    const cell = document.createElement('div')
    cell.className = 'cell'
    showBoat.appendChild(cell)
  }
}

});
// DELETE SHIP SELECTION MENU 
// MAKE GAME WORK AFTER

  }


  giveBoardCellsGame(DOMboard,enemyBoard,enemyDOMboard) { //main DOM loop
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
            
            if(this.checkGameOver()){
              this.clearDOMboard(DOMboard);
              this.loadDOMboard(DOMboard, false); //refresh board but dont add eventlistener

              enemyBoard.clearDOMboard(enemyDOMboard)
              enemyBoard.loadDOMboard(enemyDOMboard,true)

              this.loadGameOverScreen('Player')

              return
            }else if(enemyBoard.checkGameOver()){
              this.clearDOMboard(DOMboard);
              this.loadDOMboard(DOMboard, false); 

              enemyBoard.clearDOMboard(enemyDOMboard)
              enemyBoard.loadDOMboard(enemyDOMboard,true)

              enemyBoard.loadGameOverScreen('Computer')

              return
            }
            

            this.giveBoardCellsGame(DOMboard,enemyBoard,enemyDOMboard);


          });
        }
      }
    }
  }
  
  
}

