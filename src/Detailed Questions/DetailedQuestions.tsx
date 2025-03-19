import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DetailedQuestions() {
    
    const navigate = useNavigate();
    return (
        <><h1>Detailed Questions</h1>
        <Button onClick={() => { navigate("/"); } }>Home Page</Button></>
    );
  }
  
  export default DetailedQuestions;
  