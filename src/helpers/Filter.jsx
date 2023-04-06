import { myShips, enemyShips } from '../components/Randomizer';

export const idChecker = (id) => {
    if (myShips[0] && myShips[0].includes(id) && enemyShips[0] && enemyShips[0].includes(id) ) {
        myShips[0] = myShips[0].filter(index => index !== id)
        enemyShips[0] = enemyShips[0].filter(index => index !== id)
    }

    if (myShips[1] && myShips[1].includes(id) && enemyShips[1] && enemyShips[1].includes(id)) {
        myShips[1] = myShips[1].filter(index => index !== id)
        enemyShips[1] = enemyShips[1].filter(index => index !== id)
    }

    if (myShips[2] && myShips[2].includes(id) && enemyShips[2] && enemyShips[2].includes(id)) {
        myShips[2] = myShips[2].filter(index => index !== id)
        enemyShips[2] = enemyShips[2].filter(index => index !== id)
    }

    if (myShips[3] && myShips[3].includes(id) && enemyShips[3] && enemyShips[3].includes(id)) {
        myShips[3] = myShips[3].filter(index => index !== id)
        enemyShips[3] = enemyShips[3].filter(index => index !== id)
    }
}