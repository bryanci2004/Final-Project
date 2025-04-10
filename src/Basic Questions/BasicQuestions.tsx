import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './BasicQuestions.css';
import { useState } from "react";

function BasicQuestions() {
    
    const navigate = useNavigate();

    const questions = [
        {
            title: "Question 1: Long-Term Career Goals",
            question: "Do you enjoy driving to work?",
            options: ["Yes", "No"]
        },
        {
            title: "Question 2: Work Preferences",
            question: "Do you prefer working remotely or in-office?",
            options: ["Remote", "In-Office"]
        },
        {
            title: "Question 3: Collaboration Style",
            question: "Do you like working in teams?",
            options: ["Yes", "No", "Sometimes"]
        },
        {
            title: "Question 4: Learning Preferences",
            question: "How do you prefer to learn new skills?",
            options: ["Reading", "Videos", "Hands-on practice"]
        },
        {
            title: "Question 5: Work-Life Balance",
            question: "Is work-life balance important to you?",
            options: ["Yes", "No"]
        },
        {
            title: "Question 6: Time Management",
            question: "Are you a morning person?",
            options: ["Yes", "No"]
        },
        {
            title: "Question 7: Job Security",
            question: "Would you prefer a stable job or a high-risk high-reward role?",
            options: ["Stable Job", "High-Risk High-Reward"]
        },
    ];

    const[visibleCard, setVisibleCard] = useState(0);
    const [basicQuestionsAnswers, setBasicQuestionsAnswers] = useState(Array(7).fill(''));

    function handleAnswerChange(index: number, value: string){
        const updatedAnswers = {...basicQuestionsAnswers};
        updatedAnswers[index] = value;
        setBasicQuestionsAnswers({...updatedAnswers});
    }

    const currentQuestion = questions[visibleCard];

    
    return (
        <>
       <header className="BasicQuestions-header">
                <h1>Basic Questions</h1>
                <Button onClick={() => { navigate("/"); }} className="BasicQuestions-homePageButton">Home Page</Button>
            </header>
            <div className="BasicQuestions-body">
                <Container>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                        <Row className="justify-content-center mt-4">
                            <Col md={5} className="BasicQuestions-questionsContainers">
                                <h2>{currentQuestion.title}</h2>
                                <br />
                                <h6>{currentQuestion.question}</h6>

                                <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                    {currentQuestion.options.map((option, i) => (
                                        <Form.Check
                                            key={i}
                                            type="radio"
                                            label={option}
                                            name={`question-${visibleCard}`}
                                            value={option}
                                            checked={basicQuestionsAnswers[visibleCard] === option}
                                            onChange={(e) => handleAnswerChange(visibleCard, e.target.value)}
                                        />
                                    ))}
                                </Form>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
  }
  
  export default BasicQuestions;
  