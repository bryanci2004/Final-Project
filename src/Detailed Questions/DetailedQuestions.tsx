import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DetailedQuestions.css';
import { useState } from "react";

function DetailedQuestions() {
    
     
     const navigate = useNavigate();
 
     const questions = [
         {
             title: "Question 1: Long-Term Career Goals",
             question: "Do you enjoy driving to work?",
         },
         {
             title: "Question 2: Work Preferences",
             question: "Do you prefer working remotely or in-office?",
         },
         {
             title: "Question 3: Collaboration Style",
             question: "Do you like working in teams?",
         },
         {
             title: "Question 4: Learning Preferences",
             question: "How do you prefer to learn new skills?",
         },
         {
             title: "Question 5: Work-Life Balance",
             question: "Is work-life balance important to you?",
         },
         {
             title: "Question 6: Time Management",
             question: "Are you a morning person?",
         },
         {
             title: "Question 7: Job Security",
             question: "Would you prefer a stable job or a high-risk high-reward role?",
         },
     ];
 
     const[visibleCard, setVisibleCard] = useState(0);
     const [detailedQuestionsAnswers, setDetailedQuestionsAnswers] = useState(Array(7).fill(''));
     const [detailedQuestionsProgress, setDetailedQuestionsProgress] = useState(0);

 
    
     function handleAnswerChange(index: number, value: string) {
        const updatedAnswers = [...detailedQuestionsAnswers]; // spread as array
        updatedAnswers[index] = value;
        setDetailedQuestionsAnswers(updatedAnswers);
    
        const answeredCount = updatedAnswers.filter(ans => ans.trim() !== '').length;
        const progress = (answeredCount / questions.length) * 100;
        setDetailedQuestionsProgress(progress);
    }

 
     const currentQuestion = questions[visibleCard];
 
     
    return (
        <>
       <header className="DetailedQuestions-header">
                <h1>Detailed Questions </h1>
                <Button onClick={() => { navigate("/"); }} className="DetailedQuestions-homePageButton">Home Page</Button>
                <Button onClick={() => { navigate("/BasicQuestions"); }} className="DetailedQuestions-BasicButton">Switch Quiz</Button>

            </header>
        <div className="DetailedQuestions-body">
        
            <Container>
            <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                        <Row className="justify-content-center mt-4">
                            <Col md={5} className="DetailedQuestions-questionsContainers">
                                <h2>{currentQuestion.title}</h2>
                                <br />
                                <h6>{currentQuestion.question}</h6>

                                <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Type your answer here..."
                                    value={detailedQuestionsAnswers[visibleCard]}
                                    onChange={(e) => handleAnswerChange(visibleCard, e.target.value)}
                                    style={{height: '40vh'}}
                                />
                            </Form>
                                <br></br>
                                <Row>
                                <Button
            
                                //onClick={() => "submit action"}

                                disabled={visibleCard !== questions.length - 1} 
                            >
                                Submit Assessment
                            </Button>
                            </Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col className="d-flex justify-content-center">
                        <progress value={detailedQuestionsProgress} max={100} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                style={{ margin: '40px', width: '100px' }}
                                onClick={() => setVisibleCard((prev) => Math.max(0, prev - 1))}
                                disabled={visibleCard === 0}
                            >
                                Prev
                            </Button>
                            <Button
                                style={{ margin: '40px', width: '100px' }}
                                onClick={() => setVisibleCard((prev) => Math.min(questions.length - 1, prev + 1))}
                                disabled={visibleCard === questions.length - 1}
                            >
                                Next
                            </Button>
                            <Button
                                style={{ margin: '40px', width: '100px' }}
                                onClick={() => setVisibleCard((prev) => Math.min(questions.length - 1, prev + 1))}

                                disabled={visibleCard === questions.length - 1} 
                            >
                                Skip
                            </Button>
                    </Col>
                </Row>
            </Container>

        </div>
        </>
    );
  }
  
  export default DetailedQuestions;
  