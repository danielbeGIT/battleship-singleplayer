import { getDestroyer, getSubmarine, getCruiser, getBattleship } from '../helpers/GenerateShips'

// Small ship with size 2
let destroyer;

// Small ship with size 2
let submarine;

// Medium ship with size 3
let cruiser;

// Large ship with size 4
let battleship;

let myShips;
let enemyShips;

const randomizeShips = () => {
    // Random position for small ship
    const randomizeDestroyer = (ship, ship2) => {
        [ship, ship2] = getDestroyer()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship'); i++) {
            [ship, ship2] = getDestroyer()
        }
    
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')

        destroyer = [ship, ship2]
    }

    // Random position for small ship
    const randomizeSubmarine = (ship, ship2) => {
        [ship, ship2] = getSubmarine()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship'); i++) {
            [ship, ship2] = getSubmarine()
        }
    
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')

        submarine = [ship, ship2]
    }

   // Random position for medium ship
    const randomizeCruiser = (ship, ship2, ship3) => {
        [ship, ship2, ship3] = getCruiser()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship') || document.getElementById(ship3).classList.contains('ship'); i++) {
            [ship, ship2, ship3] = getCruiser()
        }

       document.getElementById(ship).classList.add('ship')
       document.getElementById(ship).classList.remove('box')

       document.getElementById(ship2).classList.add('ship')
       document.getElementById(ship2).classList.remove('box')

       document.getElementById(ship3).classList.add('ship')
       document.getElementById(ship3).classList.remove('box')
       
       cruiser = [ship, ship2, ship3]
   }

   // Random position for large ship
   const randomizeBattlehip = (ship, ship2, ship3, ship4) => {
        [ship, ship2, ship3, ship4] = getBattleship()

        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')

        document.getElementById(ship3).classList.add('ship')
        document.getElementById(ship3).classList.remove('box')

        document.getElementById(ship4).classList.add('ship')
        document.getElementById(ship4).classList.remove('box')

        battleship = [ship, ship2, ship3, ship4]
    }

    randomizeBattlehip()
    randomizeCruiser()
    randomizeSubmarine()
    randomizeDestroyer()

    myShips = [battleship, cruiser, submarine, destroyer]
    enemyShips = [battleship, cruiser, submarine, destroyer]
}

export {
    randomizeShips,
    destroyer,
    submarine,
    cruiser,
    battleship,
    myShips,
    enemyShips,
}