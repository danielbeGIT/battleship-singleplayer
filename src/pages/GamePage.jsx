// React
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap/"

// Components
import MyPlayField from "../components/MyPlayField"
import EnemyField from "../components/EnemyField"
import {randomizeShips, myShips} from "../components/Randomizer"

// Helpers
import {checkArrayOfIds} from "../helpers/Filter"
import {resetShips} from "../helpers/ResetShips"

const GamePage = () => {
    const [gameStarted, setGameStarted] = useState(false)
    const [myTurn, setMyTurn] = useState(true)
    const [enemyShips, setEnemyShips] = useState(4)
    const [myShips, setMyShips] = useState(4)
    const [winner, setWinner] = useState(false)
    const [loser, setLoser] = useState(false)

    const handleBoxClick = (e) => {
        if (!e.target.classList.contains('firedBox')) {
			e.target.classList.add('firedBox')

			const id = e.target.id;
            console.log(id)

			// Set turns
			// setMyTurn(false)
		}
    }

    // Handle winner/loser
    const handleResult = () => {
        if (!myShips === 0) {
            setWinner(true)
        } else {
            setLoser(true)
        }
    }

    // useEffect(() => {
    //     randomizeShips()
    // }, [gameStarted])

    return (
        <div className="game_page">
            <div className="header_section">
                <h2>Battleship Singleplayer</h2>
                <div className="header_button">
                    <Button size="lg" as={Link} to="/">Give up</Button>
                    <Button className="startButton" onClick={() => setGameStarted(gameStarted => !gameStarted) } size="lg">Start the game</Button>
                </div>
            </div>

            {!gameStarted && <marquee behavior="alternate"><h1>You need to start the game...</h1></marquee>}

            {winner && <marquee behavior="alternate"><h1>You are the winner!</h1></marquee>}

            {loser && <marquee behavior="alternate"><h1>Too bad.. you lost</h1></marquee>}

            {gameStarted && (
                <div className="playfield_section">
                    <div className="myField">
                        <div className="player_score">
                            <h2>You</h2>
                            Ships left: {myShips}
                        </div>
                        <MyPlayField />
                    </div>

                    <div className="enemyField">
                        <div className="player_score">
                            <h2>Computer</h2>
                            Ships left: {enemyShips}
                        </div>
                        <EnemyField onClick={handleBoxClick} myTurn={myTurn}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GamePage