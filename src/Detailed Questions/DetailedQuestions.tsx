import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DetailedQuestions.css';

function DetailedQuestions() {
    
    const navigate = useNavigate();

    return (
        <>
       <header className="DetailedQuestions-header">
                <h1>Detailed Questions</h1>
                <Button onClick={() => { navigate("/"); }} className="DetailedQuestions-homePageButton">Home Page</Button>
            </header>
        <div className="DetailedQuestions-body">
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col md={5} className="DetailedQuestions-questionsContainers">
                        <h2>Question 2: Long-Term Career Goals</h2>
                        <br></br>
                        <h6>
                        Where do you see yourself in your career five years from now? What steps are you planning to take to achieve these goals, and how do you plan to overcome potential obstacles?
                        </h6>

                        <Form className="d-flex justify-content-center align-items-center gap-3">
                            <Form.Control 
                                style={{ width: '57.5vw', height: '30vh' }} // Adjust width as needed
                            />
                        </Form>
                        <span>
                            <Button style={{margin: '40px', width: '100px'}}>Prev</Button>
                            <Button style={{marginRight: '40px', width: '100px'}}>Next</Button>
                        </span>
                        
                    </Col>
                </Row>
            </Container>

        </div>
        </>
    );
  }
  
  export default DetailedQuestions;
  