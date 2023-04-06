import MainImage from '../assets/images/cartoon_battleship.jpg'

import { Button } from "react-bootstrap/"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="home_page">
            <h2>Battleship Singleplayer</h2>
            <img 
                src={MainImage} 
                alt="MainImage" 
            />
            <Button
                size="lg" 
                as={Link} 
                to="/gamepage" 
            >
                Play the game
            </Button>
        </div>
    )
}

export default HomePage