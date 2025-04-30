import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DetailedQuestions.css';
import { useState } from "react";

function DetailedQuestions() {
    
     const navigate = useNavigate();
 
     const questions = [
         {
             title: "Question 1: Long-Term Career Goals",
             question: "How does your daily commute impact your overall job satisfaction and long-term career goals? Would a shorter or more flexible commute change how you view your current or future roles?",
         },
         {
             title: "Question 2: Work Preferences",
             question: "What aspects of remote versus in-office work environments do you find most energizing or draining? How do these preferences influence your productivity, creativity, and sense of connection with your team?",
         },
         {
             title: "Question 3: Collaboration Style",
             question: "When collaborating on a project, what role do you naturally gravitate toward, and how does working in a team setting challenge or enhance your effectiveness? How do you handle differences in work styles or opinions?",
         },
         {
             title: "Question 4: Learning Preferences",
             question: "Can you describe a time when you successfully learned a new skill or concept—what methods helped you most? How do you adapt your learning style based on the complexity or urgency of a situation?",
         },
         {
             title: "Question 5: Work-Life Balance",
             question: "How do you define a healthy work-life balance for yourself, and what boundaries or routines help you maintain it? How has your view of balance evolved throughout your career or personal life?",
         },
         {
             title: "Question 6: Time Management",
             question: "When during the day do you feel most focused and productive, and how do you structure your time to align with your natural energy cycles? Have you developed any personal routines that significantly improve your time management?",
         },
         {
             title: "Question 7: Job Security",
             question: "How do you evaluate risk and stability when making career decisions? What trade-offs are you willing to accept for greater security or greater opportunity, and how do those choices reflect your personal values or goals?",
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
            <Button onClick={() => { navigate("/BasicQuestions"); }} >Switch Quiz</Button>
        </header>

        <div className="DetailedQuestions-body">
            <Container>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                        <Row className="justify-content-center mt-4">
                            <Col md={5} className="DetailedQuestions-questionsContainers">
                            <Row>
                                <Col>
                                    <Dropdown className="BasicQuestions-questionsDropdown">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Question {visibleCard + 1}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setVisibleCard(0)}>Question 1</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setVisibleCard(1)}>Question 2</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setVisibleCard(2)}>Question 3</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setVisibleCard(3)}>Question 4</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setVisibleCard(4)}>Question 5</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setVisibleCard(5)}>Question 6</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setVisibleCard(6)}>Question 7</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <h2 style={{marginLeft: '-25vw'}}>{currentQuestion.title}</h2>
                                </Col>
                            </Row>
                                <br />
                                <h5>{currentQuestion.question}</h5>

                                <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Type your answer here..."
                                    value={detailedQuestionsAnswers[visibleCard]}
                                    onChange={(e) => handleAnswerChange(visibleCard, e.target.value)}
                                    style={{height: '35vh'}}
                                />
                            </Form>
                            <br></br>
                            <Row>
                                <Button
                                    //onClick={() => "submit action"}
                                    disabled={visibleCard !== questions.length - 1}>
                                    Submit Assessment
                                </Button>
                            </Row>
                            </Col>
                        </Row>
                        <Row>
                        <Col className="d-flex justify-content-center">
                        <progress value={detailedQuestionsProgress} max={100} className="DetailedQuestions-ProgressBar"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                style={{ margin: '2%', width: '100px' }}
                                onClick={() => setVisibleCard((prev) => Math.max(0, prev - 1))}
                                disabled={visibleCard === 0}
                            >
                                Prev
                            </Button>
                            <Button
                                style={{ margin: '2%', width: '100px' }}
                                onClick={() => setVisibleCard((prev) => Math.min(questions.length - 1, prev + 1))}
                                disabled={visibleCard === questions.length - 1}
                            >
                                Next
                            </Button>
                            <Button
                                style={{ margin: '2%', width: '100px' }}
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