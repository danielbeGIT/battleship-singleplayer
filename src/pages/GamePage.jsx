// React
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap/"

// Components
import { Grid } from "../components/PlayField"

// Helpers
import { getRandomIntInclusive } from "../helpers/RandomInt"

const GamePage = () => {
    const [turn, setTurn] = useState(0)
    const [hideCPUShips, setHideCPUShips] = useState(true)
    const [cpuTarget, setCpuTarget] = useState({ move: 0, target: null })
    const [losers, setLosers] = useState([])
    const [winner, setWinner] = useState()

    const refreshPage = () => { 
        window.location.reload(); 
    }

    const onPlayerClick = (x, y) => {
        if (isPlayersTurn()) {
            incrementTurn()
        }
    }

    const incrementTurn = () => {
        setTurn((prevState) => prevState + 1)
    }

    // First index player will always be you, consecutive ones will be CPU
    // Index start for 0 so player 1 is 0
    const players = ["Player (you)", "CPU"]

    const getTurn = () => {
        return turn % players.length
    }

    const isThisEntitysTurn = (playerNumber) => {
        return getTurn() === playerNumber
    }

    const isPlayersTurn = () => {
        return getTurn() === 0
    }
    
    const getRandomPlayer = (exclude) => {
        let found = false
        let randomPlayer = 0

        while (!found) {
            const getRandomPlayer = getRandomIntInclusive(0, players.length - 1)

            if (getRandomPlayer !== exclude) {
                randomPlayer = getRandomPlayer
                found = true
            }
        }
        return randomPlayer
    }

    const getRandomCoordExceptCurrentTurn = () => {
        return getRandomPlayer(getTurn())
    }

    useEffect(() => {
        if (!isPlayersTurn()) {
            setCpuTarget({ move: turn, target: getRandomCoordExceptCurrentTurn() })
        }
    }, [turn])

    useEffect(() => {
        if (losers?.length === players?.length - 1) {
            const winner = players.filter((player) => {
                return !losers.includes(player)
            })

            setWinner(winner)
        }
    }, [losers])

    useEffect(() => {
        let randomTurn = Math.random() < 0.5;
        setTurn(randomTurn)

        if (randomTurn) {
            console.log("CPU's Turn")
        } else {
            console.log("Your Turn")
        }
    }, [])

    return (
        <div className="game_page">
            <div className="header_section">
                <h2>Battleship Singleplayer</h2>
                <div className="header_button">
                    {!winner ? (
                        <Button className="m-10" size="lg" as={Link} to="/">Give up</Button>
                    ) : (
                        <Button className="m-10" size="lg" onClick={refreshPage}>Play again</Button>
                    )}
                    <Button onClick={() => setHideCPUShips((prevState) => !prevState)} size="lg">{hideCPUShips ? "Show Ships" : "Hide Ships"}</Button>
                </div>
            </div>

            <div className="results">
                {!winner ? (
                    <>
                        {isPlayersTurn() ? (
                            <div className="results your_turn">
                                <h1>{`${players[getTurn()]} turn`}</h1>
                            </div>
                        ) : (
                            <div className="results enemy_turn">
                                <h1>{`${players[getTurn()]} turn`}</h1>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="results">
                        <h1 className="winner">{winner} won</h1>
                    </div>
                )}
            </div>
            
            <div className="playfield_section">
                {players.map((name, playerNumber) => (
                    <Grid
                        key={`player-${playerNumber}`} 
                        turn={turn} 
                        playerName={name} 
                        isPlayer={playerNumber === 0} 
                        incrementTurn={incrementTurn} 
                        onBoxClickCallback={onPlayerClick} 
                        isThisEntitysTurn={() => isThisEntitysTurn(playerNumber)} 
                        isPlayersTurn={isPlayersTurn} 
                        playerNumber={playerNumber} 
                        cpuTarget={cpuTarget} 
                        setLosers={setLosers} 
                        disabled={winner} 
                        hideCPUShips={hideCPUShips}
                    />
                ))}
            </div>
        </div>
    )
}

export default GamePage