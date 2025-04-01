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
            <span>
                <Container className="HomePage-questionsContainers">
                    <Row>
                        <h2>Basic Questions</h2>
                    </Row>
                </Container>
            </span>
                <Button onClick={() => { navigate("/BasicQuestions"); } }>Basic Questions</Button>
                <Button onClick={() => { navigate("/DetailedQuestions"); } }>Detailed Questions</Button>
                <Button onClick={() => { navigate("/App"); } }>App</Button>
            </div>
        </>
    );
}

export default HomePage;
