import React from 'react'
import { Button } from 'react-bootstrap/'
import { Link } from 'react-router-dom'
import "../assets/styles/HomePage.scss"

const HomePage = () => {
    return (
        <div className="home_page">
            <h2>Battleship Singleplayer</h2>
            <Button
                size="lg" 
                as={Link} 
                to="/gamepage" 
            >
                Start game
            </Button>
        </div>
    )
}

export default HomePage