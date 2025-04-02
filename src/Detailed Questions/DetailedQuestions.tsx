import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DetailedQuestions.css';

function DetailedQuestions() {
    
    const navigate = useNavigate();

    return (
        <>
        <header className="DetailedQuestions-header">
            <h1>Detailed Questions</h1>
        </header><Button onClick={() => { navigate("/"); } }>Home Page</Button>
        </>
    );
  }
  
  export default DetailedQuestions;
  