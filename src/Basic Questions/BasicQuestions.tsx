import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './BasicQuestions.css';
import { useState } from "react";

function BasicQuestions() {
    
    const navigate = useNavigate();

    const questions = [
        {
          title: "Question 1: Preferred Activities",
          question: "Which activity do you enjoy the most?",
          options: [
            "Solving puzzles or analyzing data",
            "Designing visuals or writing stories",
            "Helping others or listening to their problems",
            "Building or fixing things with your hands",
            "Leading teams or organizing events"
          ]
        },
        {
          title: "Question 2: Ideal Work Environment",
          question: "What’s your preferred working environment?",
          options: [
            "Quiet and focused, ideally solo",
            "Collaborative and creative",
            "Supportive and people-oriented",
            "Fast-paced and hands-on",
            "Strategic and high-energy"
          ]
        },
        {
          title: "Question 3: Problem-Solving Approach",
          question: "How do you usually solve problems?",
          options: [
            "Logically, by breaking them down into steps",
            "Creatively, by thinking outside the box",
            "Empathetically, by considering everyone’s feelings",
            "Practically, by getting straight to the solution",
            "Strategically, by evaluating the big picture"
          ]
        },
        {
          title: "Question 4: Favorite Subject",
          question: "Which school subject did you (or do you) enjoy most?",
          options: [
            "Math or Science",
            "English or Art",
            "Psychology or Health",
            "Tech Ed or Shop",
            "Business or Social Studies"
          ]
        },
        {
          title: "Question 5: Job Motivation",
          question: "What motivates you most in a job?",
          options: [
            "Intellectual challenges",
            "Creative expression",
            "Making a difference in people’s lives",
            "Building or repairing something tangible",
            "Achieving goals and recognition"
          ]
        },
        {
          title: "Question 6: Routine Tolerance",
          question: "How do you handle routine and repetition?",
          options: [
            "I don’t mind it as long as I can improve efficiency",
            "I prefer variety and spontaneity",
            "It’s okay if I’m helping someone",
            "I’m fine with it, especially if it’s physical work",
            "I’d rather delegate it and focus on strategy"
          ]
        },
        {
          title: "Question 7: Career Curiosity",
          question: "If you could shadow someone for a day, who would it be?",
          options: [
            "A scientist or software engineer",
            "A filmmaker or writer",
            "A counselor or nurse",
            "A mechanic or chef",
            "A CEO or entrepreneur"
          ]
        }
      ];

    const[visibleCard, setVisibleCard] = useState(0);
    const [basicQuestionsAnswers, setBasicQuestionsAnswers] = useState(Array(7).fill(''));
    const [basicQuestionsProgress, setBasicQuestionsProgress] = useState(0);

    function handleAnswerChange(index: number, value: string){
        const updatedAnswers = {...basicQuestionsAnswers};
        updatedAnswers[index] = value;
        setBasicQuestionsAnswers({...updatedAnswers});
    }

    function handleProgressBar(){
        
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
                                <h5>{currentQuestion.question}</h5>

                                <Form className="d-flex flex-column align-items-start gap-3 mt-3">
                                    {currentQuestion.options.map((option, i) => {
                                        const isSelected = basicQuestionsAnswers[visibleCard] === option;

                                        return (
                                        <label
                                            key={i}
                                            className={`rectangle-option ${isSelected ? 'selected' : ''}`}
                                            onClick={() => handleAnswerChange(visibleCard, option)}
                                        >
                                            {option}
                                        </label>
                                        );
                                    })}
                                </Form>
                            </Col>
                        </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                        <progress value={75} max={100} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                style={{ margin: '3%', width: '8%' }}
                                onClick={() => setVisibleCard((prev) => Math.max(0, prev - 1))}
                                disabled={visibleCard === 0}
                            >
                                Prev
                            </Button>
                            <Button
                                style={{ margin: '3%', width: '8%' }}
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
  