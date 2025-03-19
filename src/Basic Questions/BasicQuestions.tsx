import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BasicQuestions() {
    
    const navigate = useNavigate();
    return (
        <><h1>Basic Questions</h1>
        <Button onClick={() => { navigate("/"); } }>Home Page</Button></>
    );
  }
  
  export default BasicQuestions;
  