// React
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap/"

// Components
import MyPlayField from "../components/MyPlayField"
import EnemyField from "../components/EnemyField"
import {randomizeShips, myShips, enemyShips} from "../components/Randomizer"
import { Grid } from "../components/PlayField"

// Helpers
import {idChecker} from "../helpers/Filter"

const GamePage = () => {
    const [gameButton, setGameButton] = useState()
    const [gameStarted, setGameStarted] = useState(false)
    const [turn, setTurn] = useState(0); // odd/even determines the turn
    const [hideCPUShips, setHideCPUShips] = useState(true);

    // const [shipsLeft, setShipsLeft] = useState(4)
    // const [enemyLeft, setEnemyLeft] = useState(4)

    const [winner, setWinner] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    const isYourTurn = () => {
        return turn % 2 === 0;
    };
    const onPlayerClick = (x, y) => {
        if (isYourTurn()) {
            incrementTurn();
        }
    };

    const incrementTurn = () => {
        setTurn((prevState) => prevState + 1);
    };

    // const handleBoxClick = (e) => {
    //     if (gameOver) return

    //     let id = e.target.id;

    //     if (!e.target.classList.contains('ship') && !e.target.classList.add('missBox')) {
    //         e.target.classList.remove('box')
    //         e.target.classList.add('missBox')
    //         console.log('Nice try..')

    //     } else if (e.target.classList.contains('ship')) {
    //         e.target.classList.remove('box')
    //         e.target.classList.add('hitBox')
    //         idChecker(id)

    //         console.log('Nice shot!')

    //         const checkIfShipSunk = () => {
    //             if (enemyShips[0].length === 0) {
    //                 enemyShips[0] = false
    //             }

    //             if (enemyShips[1].length === 0) {
    //                 enemyShips[1] = false
    //             }

    //             if (enemyShips[2].length === 0) {
    //                 enemyShips[2] = false
    //             }

    //             if (enemyShips[3].length === 0) {
    //                 enemyShips[3] = false
    //             }
    //         }
    //         checkIfShipSunk()
	// 	}
    //     const enemyArr = enemyShips.filter(index => index)

    //     if (enemyArr.length === 0) {
    //         setGameOver(true)
    //         setWinner(true)
    //         console.log('You won!')
    //     }

    //     setEnemyLeft(enemyArr.length)
    //     setTurn(false)

    //     return
    // }

    // const cpuBoxClick = () => {
    //     if (gameOver) return
        
    //     setTimeout(() => {
    //         const randomBox = Math.floor(Math.random() * 100) + 1;
    //         const fieldBox = document.querySelectorAll('.my_field > .row > div')

    //         if (!fieldBox[randomBox].classList.contains('ship') && !fieldBox[randomBox].classList.add('missBox')) {
    //             fieldBox[randomBox].classList.remove('box')
    //             fieldBox[randomBox].classList.add('missBox')
    //             console.log('CPU missed')

    //         } else if (fieldBox[randomBox].classList.contains('ship')) {
    //             fieldBox[randomBox].classList.remove('box')
    //             fieldBox[randomBox].classList.add('hitBox')
    //             idChecker(fieldBox[randomBox].id)
    //             console.log('CPU hit')

    //             const checkIfShipSunk = () => {
    //                 if (myShips[0].length === 0) {
    //                     myShips[0] = false
    //                 }

    //                 if (myShips[1].length === 0) {
    //                     myShips[1] = false
    //                 }

    //                 if (myShips[2].length === 0) {
    //                     myShips[2] = false
    //                 }

    //                 if (myShips[3].length === 0) {
    //                     myShips[3] = false
    //                 }
    //             }
    //             checkIfShipSunk()
    //         } else if (fieldBox[randomBox].classList.contains('hitBox') || fieldBox[randomBox].classList.contains('missBox')) {
    //             cpuBoxClick()
    //             console.log('CPU tries again')
    //         }
    //         const myArr = myShips.filter(index => index)

    //         if (myArr.length === 0) {
    //             setGameOver(true)
    //             setWinner(false)
    //             console.log('You lost!')
    //         }

    //         setShipsLeft(myArr.length)
    //         setTurn(true)
    //     }, 2000)
        
    //     return
    // }

    const startGame = () => {
        setGameOver(false)
        setGameButton(true)

        let randomTurn = Math.random() < 0.5;
        setTurn(randomTurn)
        console.log(randomTurn)

        setTimeout(() => {
            randomizeShips()
        }, 500)

        setTimeout(() => {
            setGameButton(false)
        }, 2000)

        // setEnemyLeft(4)
        // setShipsLeft(4)
        setGameStarted(true)
        
        return
    }

    // if (!turn && gameStarted) {
    //     cpuBoxClick()
    // }

    return (
        <div className="game_page">
            <div className="header_section">
                <h2>Battleship Singleplayer</h2>
                <div className="header_button">
                    <Button 
                        className="m-10"
                        size="lg" 
                        as={Link} 
                        to="/"
                    >
                        Give up
                    </Button>

                    {!gameStarted ? (
                        <Button 
                            className="startButton" 
                            onClick={() => startGame()} 
                            size="lg"
                        >
                            Start game
                        </Button>
                    ) : (
                        <>
                            <Button 
                                className="startButton" 
                                onClick={() => setGameStarted(false)} 
                                size="lg"
                                disabled={gameButton}
                            >
                                Restart
                            </Button>
                        
                            <Button 
                                onClick={() => setHideCPUShips((prevState) => !prevState)}
                                size="lg"
                            >
                                {hideCPUShips ? "Show Ships" : "Hide Ships"}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {!gameStarted ? (
                <marquee behavior="alternate">
                    <h1>You need to start the game...</h1>
                </marquee>
            ) : (
                <>
                    {gameOver &&
                        <>
                            {winner ? (
                                <marquee behavior="alternate">
                                    <h1>You are the winner!</h1>
                                </marquee>
                            ) : (
                                <marquee behavior="alternate">
                                    <h1>Too bad.. you lost</h1>
                                </marquee>
                            )}
                        </>
                    }

                    {!gameOver && 
                        <>
                            {isYourTurn() ? (
                                <div className="check_turns your_turn">
                                    <h1>Your Turn!</h1>
                                </div>
                            ) : (
                                <div className="check_turns enemy_turn">
                                    <h1>CPUs Turn!</h1>
                                </div>
                            )}
                        </>
                    }

                    <div className="playfield_section">
                        <div className="myField">
                            <Grid
                                turn={turn}
                                playerName="You"
                                isYourTurn={isYourTurn}
                                isPlayer={true}
                                incrementTurn={incrementTurn}
                            />
                        </div>

                        <div className="enemyField">
                            <Grid
                                turn={turn}
                                playerName="CPU"
                                isYourTurn={isYourTurn}
                                onBoxClickCallback={onPlayerClick}
                                hideShips={hideCPUShips}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default GamePage