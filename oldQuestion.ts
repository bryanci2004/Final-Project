/*
import { Button, Col, Container, Dropdown, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './BasicQuestions.css';
import { useState } from "react";
import { askChatGPT } from "../ChatGPT_API/chatgptService";

// Test change

// grab the raw JSON string you stored under “MYKEY”
const raw = localStorage.getItem("MYKEY");
// parse it (or fall back to an empty string)
const apiKey = raw ? JSON.parse(raw) : "";


function BasicQuestions() {
    
    const navigate = useNavigate();

    const questions = [
        {
          title: "Preferred Activities",
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
          title: "Ideal Work Environment",
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
          title: "Problem-Solving Approach",
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
          title: "Favorite Subject",
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
          title: "Job Motivation",
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
          title: "Routine Tolerance",
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
          title: "Career Curiosity",
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

    const [visibleCard, setVisibleCard] = useState(0);
    const [basicQuestionsAnswers, setBasicQuestionsAnswers] = useState(Array(7).fill(''));
    const [basicQuestionsProgress, setBasicQuestionsProgress] = useState(0);
    // UI state for ChatGPT integration
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const isLast = visibleCard === questions.length - 1;

  async function handleSubmit(): Promise<void> {
    setLoading(true);

    const promptString =
      "A user completed the basic career quiz with these answers:\n" +
      basicQuestionsAnswers
        .map((ans, i) => `Q${i + 1}: ${ans || "(no answer)"}`)
        .join("\n") +
      "\n\nBased on these responses, suggest 2–3 suitable career paths and explain why.";

    try {
      const rec = await askChatGPT(promptString);
      setRecommendation(rec);
    } catch {
      setRecommendation("❗ Error: please check your API key or network.");
    } finally {
      setLoading(false);
    }
  }


    function handleAnswerChange(index: number, value: string){
        const updatedAnswers = [...basicQuestionsAnswers];
        updatedAnswers[index] = value;
        setBasicQuestionsAnswers(updatedAnswers);

        const answeredCount = updatedAnswers.filter(ans => ans !== '').length;
        const progress = (answeredCount / questions.length) * 100;
        setBasicQuestionsProgress(progress);
    }
//    const questionArray: string[] = [];

    function testButton() {
      console.log("API Key:", apiKey);
    }
    const currentQuestion = questions[visibleCard];

    
    return (
        <>
       <header className="BasicQuestions-header">
                <h1>Basic Questions</h1>
                <Button onClick={() => { navigate("/"); }} className="BasicQuestions-homePageButton">Home Page</Button>
                <Button onClick={() => { navigate("/DetailedQuestions"); }}>Switch Quiz</Button>
            </header>
            <div className="BasicQuestions-body">
                <Container>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                        <Row className="justify-content-center mt-4">
                            <Col md={5} className="BasicQuestions-questionsContainers">
                                <Row>
                                  <span>
                                  <h2>{currentQuestion.title}</h2>
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
                                  </span>
                                </Row>
                                
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
                                <br></br>
                            <Row>
                            <Button
                              onClick={handleSubmit}
                              disabled={!isLast || loading}
                              style={{ width: "100%" }}
                            >{loading ? (<Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />) : ("Submit Assessment")}
                            </Button>

                                
                            </Row>
                            {recommendation && (
                              <Row className="mt-3">
                                <Col>
                                  <div className="recommendation-box">
                                    {recommendation}
                                  </div>
                                </Col>
                              </Row>
                            )}
                            </Col>
                        </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                        <progress value={basicQuestionsProgress} max={100} className="BasicQuestions-ProgressBar"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                style={{ margin: '2%', width: '8%' }}
                                onClick={() => setVisibleCard((prev) => Math.max(0, prev - 1))}
                                disabled={visibleCard === 0}
                            >
                                Prev
                            </Button>
                            <Button
                                style={{ margin: '2%', width: '8%' }}
                                onClick={() => setVisibleCard((prev) => Math.min(questions.length - 1, prev + 1))}
                                disabled={visibleCard === questions.length - 1}
                            >
                                Next
                            </Button>
                            <Button
                                style={{ margin: '2%', width: '100px' }}
                                onClick={() => {
                                  handleAnswerChange(visibleCard, '');
                                  setVisibleCard((prev) => Math.min(questions.length - 1, prev + 1));
                                }}

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
  
  export default BasicQuestions;
  */