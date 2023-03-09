import { Button } from 'react-bootstrap/'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header_section">
            <h2>Battleship Singleplayer</h2>
            <Button
                size="lg" 
                as={Link} 
                to="/" 
            >
                Home
            </Button>
        </div>
    )
}

export default Header