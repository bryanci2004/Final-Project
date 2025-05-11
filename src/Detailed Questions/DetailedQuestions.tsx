import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DetailedQuestions.css';
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { askChatGPT } from "../chatgptService";
import { Spinner } from "react-bootstrap";

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

     
    // ChatGPT integration state
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendation, setRecommendation] = useState<string | null>(null);

    // helper to know when we're on the last card
    const isLast = visibleCard === questions.length - 1;

 
    async function handleSubmit(): Promise<void> {
        setLoading(true);
        console.log("All detailed answers:", detailedQuestionsAnswers);
        // build a simple “Q1: …” list of the user’s detailed answers
        // Build a list of “Question: …” + “Answer: …” pairs
        const qaLines = questions.map((q, i) =>
            `Q${i + 1}: ${q.question}\nA${i + 1}: ${detailedQuestionsAnswers[i] || "(no answer)"}`
        ).join("\n\n");
  
      
        // the same structured prompt template you used in BasicQuestions
        const template = `
You are a professional career advisor. For each recommendation, follow this exact format:

### **Recommended Career: <Career Title>**

---

## Why This Fits You  
- **Bullet 1**  
- **Bullet 2**  
- **Bullet 3**

## Day‑to‑Day Responsibilities  
- Short bullet or sentence  

## Salary & Outlook  
- **Median Annual Wage:** …  
- **Entry‑Level:** …  
- **Experienced:** …  
- **Job Growth:** …

## Top Employers & Work Environments  
- Employer 1  
- Employer 2  
- Employer 3

## Key Skills & Certifications  
- Skill/Certification 1  
- Skill/Certification 2  

## Next Steps to Get Started  
1. Action step 1  
2. Action step 2  

Now provide **3** such recommendations. Do not add any other sections.
      `.trim();
      
        // stitch template + actual answers
        const prompt = [
            template,
            "",
            "Here are the questions and the user’s answers:",
            qaLines,
          ].join("\n");
                console.log("Prompt going out to GPT:\n", prompt);
        try {
          const rec = await askChatGPT(prompt);
          setRecommendation(rec);
        } catch {
          setRecommendation("❗ Error: please check your API key or network.");
        } finally {
          setLoading(false);
        }
      }
      
     function handleAnswerChange(index: number, value: string) {
        console.log(`Q${index+1} changed →`, value);
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
                                onClick={handleSubmit}
                                disabled={!isLast || loading}>
                                {loading
                                    ? <Spinner animation="border" size="sm" />
                                    : "Submit Assessment"}
                                </Button>
                            </Row>
                                {recommendation && (
                                <div className="recommendation-box mt-3">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={recommendation} />
                                </div>
                                )}
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