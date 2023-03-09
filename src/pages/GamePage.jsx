import Header from '../components/Header'
import PlayField from '../components/PlayField'

const GamePage = () => {
    return (
        <div className="game_page">
            <Header/>
            <div className="playfield_section">
                <div className="startButton">
                    Start the round
                </div>
                <PlayField />
            </div>
        </div>
    )
}

export default GamePage