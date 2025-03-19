import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (
        <><h1>Home Page</h1>
        <Button onClick={() => { navigate("/BasicQuestions"); } }>Basic Questions</Button>
        <Button onClick={() => { navigate("/DetailedQuestions"); } }>Detailed Questions</Button>
        <Button onClick={() => { navigate("/App"); } }>App</Button>
        </>
    );
}

export default HomePage;
