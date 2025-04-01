import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './HomePage.css'

function HomePage() {

    const navigate = useNavigate();

    return (
        <>
        <header className="HomePage-header">
            <h1>Home Page</h1>
        </header>
        <div className="HomePage-body">
            <Container>
                <Row>
                    <Col>
                        <h1>Welcome to Career Quiz! The first ever AI powered career quiz!</h1>
                    </Col>
                </Row>
            </Container>
            <span>
                <Container className="HomePage-questionsContainers">
                    <Row>
                        <h2>Click here to take the Basic Questions quiz!</h2>
                    </Row>
                    <Row>
                        <Button onClick={() => { navigate("/BasicQuestions"); } }>Basic Questions</Button>
                    </Row>
                </Container>
                <Container className="HomePage-questionsContainers">
                    <Row>
                        <h2>Click here to take the Detailed Questions quiz! </h2>
                    </Row>
                    <Row>
                        <Button onClick={() => { navigate("/DetailedQuestions"); } }>Detailed Questions</Button>
                    </Row>
                </Container>
            </span>
        </div>
        </>
    );
}

export default HomePage;
