import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const PlayField = () => {
    return (
        <div className="playfield-container">
            <Container className="game-board">
                <Row>
                    <Col>
                        Play field with rows/col
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PlayField