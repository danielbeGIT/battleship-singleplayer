import React from 'react'
import Header from '../components/Header'
import PlayField from '../components/PlayField'
import "../assets/styles/GamePage.scss"

const GamePage = () => {
    return (
        <>
            <Header/>

            <div className="startButton">

            </div>

            <PlayField />

        </>
    )
}

export default GamePage