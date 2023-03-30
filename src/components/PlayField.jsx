import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const PlayField = (props) => {
    return (
        <div className="playfield_container">
            <Container className="game_board">
                <Row className="rows_container">
                    {props.refs.map((index) => (
                        <Col className="square_container" key={index}>
                            {index}
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default PlayField