// React
import { useEffect, useState } from "react"
import { Link, redirect } from "react-router-dom"
import { Button } from "react-bootstrap/"

// Components
import MyPlayField from "../components/MyPlayField"
import EnemyField from "../components/EnemyField"
import {randomizeShips, myShips, enemyShips} from "../components/Randomizer"

// Helpers
import {idChecker} from "../helpers/Filter"

const GamePage = () => {
    const [gameButton, setGameButton] = useState()
    const [gameStarted, setGameStarted] = useState()
    const [myTurn, setMyTurn] = useState(null)
    const [enemyLeft, setEnemyLeft] = useState(4)
    const [shipsLeft, setShipsLeft] = useState(4)

    const [winner, setWinner] = useState(false)
    const [loser, setLoser] = useState(false)

    const handleBoxClick = (e) => {
        let id = e.target.id;
        let hit = false
        const currentBox = document.querySelector(`#${id}`);
        console.log(id)

        if (!e.target.classList.contains('missBox')) {
			e.target.classList.add('missBox')
		}

        if (currentBox.classList.contains('ship')) {
            hit = true
            idChecker(id)

            const checkIfShipSunk = () => {
                if (myShips[0].length === 0) {
                    myShips[0] = false
                }

                if (myShips[1].length===0) {
                    myShips[1] = false
                }

                if (myShips[2].length===0) {
                    myShips[2] = false
                }

                if (myShips[3].length===0) {
                    myShips[3] = false
                }
            }
            checkIfShipSunk()
        }

        if (hit) {
            currentBox.classList.remove('box')
            currentBox.classList.add('hitBox')

        } else {
            currentBox.classList.remove('box')
            currentBox.classList.add('missBox')
        }

        const myArr = myShips.filter(index => index)
        const enemyArr = enemyShips.filter(index => index)

        setEnemyLeft(value => value - 1)

        if (myArr.length === 0) {
            setLoser(true)
            console.log('You lost!')
        }

        if (enemyArr.length === 0) {
            setWinner(true)
            console.log('You won!')
        }

        setEnemyLeft(enemyArr.length)
        setShipsLeft(myArr.length)
        setMyTurn(prevState => !prevState)
        return
    }

    const cpuBoxClick = () => {
        setTimeout(() => {
            const randomBox = Math.floor(Math.random() * 100) + 1;
            const fieldBox = document.querySelectorAll('.my_field > .row > div')

            if (fieldBox[randomBox].classList.contains('ship')) {
                fieldBox[randomBox].classList.remove('box')
                fieldBox[randomBox].classList.add('hitBox')
                console.log('CPU hit')

            } else if (!fieldBox[randomBox].classList.contains('ship')) {
                fieldBox[randomBox].classList.remove('box')
                fieldBox[randomBox].classList.add('missBox')
                console.log('CPU missed')

            } else if (fieldBox[randomBox].classList.contains('hitBox') || fieldBox[randomBox].classList.contains('missBox')) {
                console.log('try again')
                cpuBoxClick()
            }
        }, 3000)

        setMyTurn(prevState => !prevState)
        return
    }

    const startGame = () => {
        setGameButton(true)

        setTimeout(() => {
            let randomTurn = Math.random() < 0.5;
            randomizeShips()
            setMyTurn(randomTurn)
        }, 300)

        setTimeout(() => {
            setGameButton(false)
        }, 1000)

        setEnemyLeft(4)
        setShipsLeft(4)
        setGameStarted(true)
        
        return
    }

    if (!myTurn) {
        cpuBoxClick()
    }

    return (
        <div className="game_page">
            <div className="header_section">
                <h2>Battleship Singleplayer</h2>
                <div className="header_button">
                    <Button size="lg" as={Link} to="/">Give up</Button>

                    {gameStarted && <Button 
                        className="startButton" 
                        onClick={() => setGameStarted(false)} 
                        size="lg"
                        disabled={gameButton}
                    >
                        Restart
                    </Button>}

                    {!gameStarted && <Button 
                        className="startButton" 
                        onClick={() => startGame()} 
                        size="lg"
                    >
                        Start game
                    </Button>}
                    
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
                            Ships left: {shipsLeft}
                        </div>
                        <MyPlayField />
                    </div>

                    <div className="enemyField">
                        <div className="player_score">
                            <h2>Computer</h2>
                            Ships left: {enemyLeft}
                        </div>
                        <EnemyField onClick={handleBoxClick} myTurn={myTurn}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GamePage