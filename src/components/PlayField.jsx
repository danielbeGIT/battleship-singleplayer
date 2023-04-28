// React
import { useEffect, useState } from "react"

// Helpers
import { Box } from "../helpers/Boxes"
import { buildMap, getNewCoord, getCoordName, getTotalShips } from "../helpers/RandomInt"

// Imports
import cloneDeep from "lodash.clonedeep"

// Grid size
const GRID_AMOUNT = 10

export const Grid = ({
    playerName,
    onBoxClickCallback,
    incrementTurn,
    hideCPUShips,
    isPlayersTurn,
    playerNumber,
    cpuTarget,
    setLosers,
    disabled,
    isPlayer
}) => {
    const [gridMap, setGridMap] = useState(() => buildMap(GRID_AMOUNT))
    const [clickedShip, setClickedShip] = useState(0)

    useEffect(() => {
        if (playerNumber === cpuTarget.target) {
            CPUTurn()
        }
    }, [cpuTarget])

    const CPUTurn = () => {
        setTimeout(() => {
            getNewCoord(GRID_AMOUNT, gridMap, (x, y) => {
                updateGridMap(x, y)
                incrementTurn()
            })
        }, 1000)
    }

    const updateGridMap = (x, y) => {
        setGridMap((prevState) => {
            const newGridMap = cloneDeep(prevState)

            if (newGridMap[y][x] === "s")

            setClickedShip((prevState) => prevState + 1)

            newGridMap[y][x] = newGridMap[y][x] === "s" ? "hit" : "x"

            return newGridMap
        })
    }

    const onBoxClick = (x, y) => {
        if (isPlayersTurn() && playerNumber !== 0 && gridMap[y][x] !== "x" && gridMap[y][x] !== "hit") {
            // Players own grid is unclickable
            updateGridMap(x, y)
            onBoxClickCallback()
        }
    }

    useEffect(() => {
        if (clickedShip === getTotalShips()) {
            setLosers((prevState) => [...prevState, playerName])
        }
    }, [clickedShip])

    const handleShowShip = (type) => {
        if (hideCPUShips && !isPlayer) return false
        return type === "s"
    }

    return (
        <div className="playfield">
            <h2>{playerName}</h2>
            {gridMap.map((val, y) => (
                <div className="Grid" key={`grid-${y}`}>
                    {[...val].map((type, x) => (
                        <Box
                            key={`box-${x}`}
                            selected={type === "x"}
                            isShip={handleShowShip(type)}
                            isHit={type === "hit"}
                            onClick={() => onBoxClick(x, y)}
                            text={getCoordName(gridMap, x, y)}
                            disabled={disabled}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}