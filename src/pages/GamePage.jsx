// React
import { useState } from "react"
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap/'

// Components
import MyPlayField from '../components/MyPlayField'

const GamePage = () => {
    const [gameStarted, setGameStarted] = useState(true)
    const [myTurn, setMyTurn] = useState(true)
    const [enemyShips, setEnemyShips] = useState(0)
    const [myShips, setMyShips] = useState(0)
    const [winner, setWinner] = useState(false)
    const [loser, setLoser] = useState(false)

    // Handle winner/loser
    const handleWinner = () => {
        setWinner(true)
    }
    const handleLoser = () => {
        setLoser(true)
    }

    return (
        <div className="game_page">
            <div className="header_section">
                <h2>Battleship Singleplayer</h2>
                <div className="header_button">
                    <Button 
                        size="lg" 
                        as={Link} 
                        to="/"
                    >
                        Give up
                    </Button>

                    <Button 
                        className="startButton" 
                        onClick={() => setGameStarted(true) } 
                        size="lg"
                    >
                        Start the game
                    </Button>
                </div>
            </div>
            {gameStarted && (
                <>
                    <div className="player_score">
                        Show Player Scores Player & Computer
                    </div>
                    <div className="playfield_section">
                        <MyPlayField />
                    </div>
                </>
            )}
        </div>
    )
}

export default GamePage