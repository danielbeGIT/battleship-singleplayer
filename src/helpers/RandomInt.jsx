// Get random Int
export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    // The max is inclusive and the min is inclusive
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Get random coords
export const getRandomCoords = (min, max) => {
    const randomX = getRandomIntInclusive(min, max)
    const randomY = getRandomIntInclusive(min, max)

    return [randomX, randomY]
}

// Ships in width blocks
export const SHIPS = [4, 3, 2, 2]

export const getTotalShips = () =>
    SHIPS.reduce((acc, val) => {
        acc += val
        return acc
}, 0)

// Build the actual playfield/map with randomized ships
export const buildMap = (dimension) => {
    const gridMap = Array.from(Array(dimension), () => new Array(dimension))

    SHIPS.forEach((val) => {
        let good = false

        while (!good) {
            const [randomX, randomY] = getRandomCoords(0, dimension - 1)

            if (dimension - randomX + 1 >= val && randomX + val <= dimension && !gridMap[randomY][randomX]) {
                const containsExisting = () => {
                    return Array.from(new Array(val)).some((_val, index) => {
                        if (index === 0) {
                            // Check if there is empty space before
                            if (gridMap?.[randomY]?.[randomX - 1]) return true
                        }

                        if (index + 1 === val) {
                            // Check if there is empty space before
                            if (gridMap?.[randomY]?.[randomX + index + 1]) return true
                        }

                        return !!gridMap[randomY][randomX + index]
                    })
                }

                // Add ships
                const addShip = () => {
                    return Array.from(new Array(val)).forEach((_val, index) => {
                        return (gridMap[randomY][randomX + index] = "s")
                    })
                }

                if (!containsExisting()) {
                    addShip()
                    good = true
                }
            }
        }
    })
    return gridMap
}
  
export const getNewCoord = (GRID_AMOUNT, gridMap, callback) => {
    let isNewPos = false

    while (!isNewPos) {
        const [x, y] = getRandomCoords(0, GRID_AMOUNT - 1)

        if ((gridMap[y][x] !== "x" && gridMap[y][x] !== "hit") || gridMap === null) {
            isNewPos = [x, y]
        }
    }

    const [x, y] = isNewPos
    callback?.(x, y)

    return isNewPos
}
  
const indexToAlpha = (num = 1) => {
    // ASCII val of first character
    const A = "A".charCodeAt(0)

    const numberToCharacter = (number) => {
        return String.fromCharCode(A + number)
    }

    return numberToCharacter(num)
}
  
export const getCoordName = (gridMap, x, y) => {
    if (gridMap[y][x] === "hit" || gridMap[y][x] === "x") {
        return `${indexToAlpha(x)}${y + 1}`
    }
}