// React
import { useEffect, useState } from "react";

// Helpers
import { Box } from "../helpers/Boxes";
import { getRandomIntInclusive } from "../helpers/RandomInt";

// Grid size
const gridAmount = 10;

// Randomize using random int
const getRandomCoords = (min, max) => {
    const randomX = getRandomIntInclusive(min, max);
    const randomY = getRandomIntInclusive(min, max);
    
    return [randomX, randomY];
};

// Build the field
const buildMap = (dimension) => {
    const ships = [4, 3, 2, 2]; // width in blocks
    const gridMap = Array.from(Array(dimension), () => new Array(dimension));

    ships.forEach((val) => {
    let good = false;

        while (!good) {
            const [randomX, randomY] = getRandomCoords(0, gridAmount - 1);
            if (gridAmount - randomX >= val) {
            
                // Check if grid contains ship
                const containsExisting = () => {
                    return Array.from(new Array(val)).find((_val, index) => {
                        return !!gridMap[randomY][randomX + index];
                    });
                };

                // Add ship to grid 
                const addShip = () => {
                    return Array.from(new Array(val)).forEach((_val, index) => {
                        return (gridMap[randomY][randomX + index] = "s");
                    });
                };

                // Don't add ship if contains ship
                if (!containsExisting()) {
                    addShip();
                    good = true;
                }
            }
        }
    });

    return gridMap;
};

export const Grid = ({
    isYourTurn,
    playerName,
    onBoxClickCallback,
    turn,
    isPlayer,
    incrementTurn,
    hideShips,
}) => {
    useEffect(() => {
        if (isPlayer && !isYourTurn()) {
            setTimeout(CPUTurn, 1000);
        }
    }, [turn]);

    const [gridMap, setGridMap] = useState(() => buildMap(gridAmount));
    const [shipsLeft, setShipsLeft] = useState(4)

    // when cputurn, cpu random fire shots
    const CPUTurn = () => {
        let isNewPos = false;

        while (!isNewPos) {
            const [x, y] = getRandomCoords(0, gridAmount - 1);

            if (!gridMap[y][x]) {
                isNewPos = [x, y];
            }
        }
        const [x, y] = isNewPos;

        updateGridMap(x, y);
        incrementTurn();
        return isNewPos;
    };

    // update the field
    const updateGridMap = (x, y) => {
        setGridMap((prevState) => {
            const newGridMap = [...prevState];
            newGridMap[y][x] = "x";

            return newGridMap;
        });
    };

    // handle box clicks
    const onBoxClick = (x, y) => {
        if (isYourTurn() && !isPlayer) {
            updateGridMap(x, y);
            onBoxClickCallback();
        }
    };

    return (
        <div className="playfield">
            <div className="player_score">
                <h2>{playerName}</h2>
                Ship(s) left: {shipsLeft}
            </div>
            {gridMap.map((val, y) => {
                return (
                    <div className="Grid">
                        {[...val].map((text, x) => (
                            <Box
                                selected={text === "x"}
                                isShip={!hideShips && text === "s"}
                                onClick={() => onBoxClick(x, y)}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
