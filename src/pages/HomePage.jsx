import React from 'react'
import { Button } from 'react-bootstrap/'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div className="container">
                <div>
                    <Button
                        as={Link}
                        to="/gamepage"
                    >
                    Start game
                    </Button>
                </div>
            </div>
        </>
    )
}

export default HomePage