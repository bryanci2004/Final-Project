import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './BasicQuestions.css';
import { useState } from "react";

function BasicQuestions() {
    
    const navigate = useNavigate();

    const [basicQuestionsAnswers, setBasicQuestionsAnswers] = useState(Array(7).fill(''));

    function handleAnswerChange(index: number, value: string){
        const updatedAnswers = {...basicQuestionsAnswers};
        updatedAnswers[index] = value;
        setBasicQuestionsAnswers({...updatedAnswers});
    }
    
    return (
        <>
       <header className="BasicQuestions-header">
                <h1>Basic Questions</h1>
                <Button onClick={() => { navigate("/"); }} className="BasicQuestions-homePageButton">Home Page</Button>
            </header>
        <div className="BasicQuestions-body">
            <Container>
                <Card>
                <Row className="justify-content-center mt-4">
                        <Col md={5} className="BasicQuestions-questionsContainers">
                            <h2>Question 1: Long-Term Career Goals</h2>
                            <br></br>
                            <h6>
                            Do you enjoy driving to work? Yes or no?
                            </h6>

                            <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                    <Form.Check 
                                        type="radio"
                                        label="Yes"
                                        name="driveToWork"
                                        value="yes"
                                        onChange={(e) => handleAnswerChange(0, e.target.value)}
                                    />
                                    <Form.Check 
                                        type="radio"
                                        label="No"
                                        name="driveToWork"
                                        value="no"
                                        onChange={(e) => handleAnswerChange(0, e.target.value)}
                                    />
                                </Form>
                        </Col>
                    </Row>
                    </Card>
                    <Card>
                    <Row className="justify-content-center mt-4">
                        <Col md={5} className="BasicQuestions-questionsContainers">
                            <h2>Question 2: Long-Term Career Goals</h2>
                            <br></br>
                            <h6>
                            Do you enjoy driving to work? Yes or no?
                            </h6>

                            <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                    <Form.Check 
                                        type="radio"
                                        label="Yes"
                                        name="driveToWork"
                                        value="yes"
                                        onChange={(e) => handleAnswerChange(1, e.target.value)}
                                    />
                                    <Form.Check 
                                        type="radio"
                                        label="No"
                                        name="driveToWork"
                                        value="no"
                                        onChange={(e) => handleAnswerChange(1, e.target.value)}
                                    />
                                </Form>
                        </Col>
                    </Row>
                    </Card>
                    <Card>
                    <Row className="justify-content-center mt-4">
                    <Col md={5} className="BasicQuestions-questionsContainers">
                        <h2>Question 3: Long-Term Career Goals</h2>
                        <br></br>
                        <h6>
                        Do you enjoy driving to work? Yes or no?
                        </h6>

                        <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Check 
                                    type="radio"
                                    label="Yes"
                                    name="driveToWork"
                                    value="yes"
                                    onChange={(e) => handleAnswerChange(2, e.target.value)}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="No"
                                    name="driveToWork"
                                    value="no"
                                    onChange={(e) => handleAnswerChange(2, e.target.value)}
                                />
                            </Form>
                    </Col>
                </Row>
                </Card>
                <Card>
                <Row className="justify-content-center mt-4">
                    <Col md={5} className="BasicQuestions-questionsContainers">
                        <h2>Question 4: Long-Term Career Goals</h2>
                        <br></br>
                        <h6>
                        Do you enjoy driving to work? Yes or no?
                        </h6>

                        <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Check 
                                    type="radio"
                                    label="Yes"
                                    name="driveToWork"
                                    value="yes"
                                    onChange={(e) => handleAnswerChange(3, e.target.value)}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="No"
                                    name="driveToWork"
                                    value="no"
                                    onChange={(e) => handleAnswerChange(3, e.target.value)}
                                />
                            </Form>
                    </Col>
                </Row>
                </Card>
                <Card>
                <Row className="justify-content-center mt-4">
                    <Col md={5} className="BasicQuestions-questionsContainers">
                        <h2>Question 5: Long-Term Career Goals</h2>
                        <br></br>
                        <h6>
                        Do you enjoy driving to work? Yes or no?
                        </h6>

                        <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Check 
                                    type="radio"
                                    label="Yes"
                                    name="driveToWork"
                                    value="yes"
                                    onChange={(e) => handleAnswerChange(4, e.target.value)}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="No"
                                    name="driveToWork"
                                    value="no"
                                    onChange={(e) => handleAnswerChange(4, e.target.value)}
                                />
                            </Form>
                    </Col>
                </Row>
                </Card>
                <Card>
                <Row className="justify-content-center mt-4">
                    <Col md={5} className="BasicQuestions-questionsContainers">
                        <h2>Question 6: Long-Term Career Goals</h2>
                        <br></br>
                        <h6>
                        Do you enjoy driving to work? Yes or no?
                        </h6>

                        <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Check 
                                    type="radio"
                                    label="Yes"
                                    name="driveToWork"
                                    value="yes"
                                    onChange={(e) => handleAnswerChange(5, e.target.value)}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="No"
                                    name="driveToWork"
                                    value="no"
                                    onChange={(e) => handleAnswerChange(5, e.target.value)}
                                />
                            </Form>
                    </Col>
                </Row>
                </Card>
                <Card>
                <Row className="justify-content-center mt-4">
                    <Col md={5} className="BasicQuestions-questionsContainers">
                        <h2>Question 7: Long-Term Career Goals</h2>
                        <br></br>
                        <h6>
                        Do you enjoy driving to work? Yes or no?
                        </h6>

                        <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Check 
                                    type="radio"
                                    label="Yes"
                                    name="driveToWork"
                                    value="yes"
                                    onChange={(e) => handleAnswerChange(6, e.target.value)}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="No"
                                    name="driveToWork"
                                    value="no"
                                    onChange={(e) => handleAnswerChange(6, e.target.value)}
                                />
                            </Form>
                    </Col>
                </Row>
                </Card>
                <Row>
                    <Col>
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
  
  export default BasicQuestions;
  