function cellObject(x,y,hasShip){
  return{
    x,
    y,
    hasShip
  }
}

class Gameboard{
  constructor(size){
    this.size = size
  }

  createGameboard(){

    // const gameboardDOM = document.querySelector('.gameboard')
    const gameboardCellArray = []
    for(let y = 1; y<=this.size;y++){
      for(let x = 1; x<=this.size;x++){

        gameboardCellArray.push(cellObject(x,y,false))

      }
      // const cell = createElement('div');
      // cell.className = 'cell'
      // gameboardDOM.appendChild(cell)
      

    }
    return gameboardCellArray
  }



  placeShipHead(x,y,ship,facing='west'){



    if(facing == 'west'){
      // check if placement possible
      // then  ...
      // should only return coordinates of ship for now <---END GOAL
    }
  }
  
}

const g = new Gameboard(8)
g.createGameboard()

module.exports = Gameboard