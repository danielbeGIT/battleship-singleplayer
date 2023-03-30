import Header from '../components/Header'
import PlayField from '../components/PlayField'

const GamePage = () => {
    const row = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const column = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const ref = ["", "A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];

    return (
        <div className="game_page">
            <Header/>
            <div className="playfield_section">
                <div className="startButton">
                    Start the round
                </div>
                <PlayField 
                    rows={row}
                    columns={column}
                    refs={ref}
                />
            </div>
        </div>
    )
}

export default GamePage