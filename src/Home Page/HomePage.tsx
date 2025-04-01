import { Button, Container, Row } from "react-bootstrap";
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
                    <h1> Welcome to Career Quiz! The first ever AI powered career quiz!</h1>
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
                <Button onClick={() => { navigate("/App"); } }>App</Button>
            </div>
        </>
    );
}

export default HomePage;
