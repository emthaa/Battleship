class Gameboard{
  constructor(size){
    this.size = size
  }

  createGameboard(){
    
    for(let i = 0; i<=this.size*this.size;i++){
      const cell = createElement('div');
      cell.className = 'cell'
      
    }

  }
  
}

module.exports = Gameboard