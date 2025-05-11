import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Col, Container, Row, Spinner, ProgressBar, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { askChatGPT } from "../chatgptService";
import "./BasicQuestions.css";

interface Question {
  title: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
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

export default function BasicQuestions(): JSX.Element {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [progress, setProgress] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  // Log answers whenever they change
  useEffect(() => {
    console.log("Updated answers state:", answers);
  }, [answers]);

  const handleAnswerChange = (option: string) => {
    console.log(`Q${currentIndex+1} changed →`, option);
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
    const answeredCount = updated.filter((ans) => ans.trim() !== "").length;
    setProgress((answeredCount / questions.length) * 100);
  };

  const goToPrevious = () => {
    if (!isFirst) setCurrentIndex((idx) => idx - 1);
  };

  const goToNext = () => {
    if (!isLast) setCurrentIndex((idx) => idx + 1);
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);

    console.log("All basic answers:", answers);
    // Pair questions and answers
    const qaLines = questions
      .map((q, i) =>
        `Q${i+1}: ${q.question}\nA${i+1}: ${answers[i] || "(no answer)"}`
      )
      .join("\n\n");
    console.log("Prompt Q&A lines:\n", qaLines);

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

    const prompt = [template, "", "Here are the questions and answers:", qaLines].join("\n");
    console.log("Final prompt to GPT:\n", prompt);

    try {
      const rec = await askChatGPT(prompt);
      setRecommendation(rec);
    } catch {
      setRecommendation("❗ Error: please check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      alert("🎉 You’ve answered all the questions! Feel free to review or submit.");
    }
  }, [progress]);

  return (
    <>
      <header className="BasicQuestions-header">
        <h1>Basic Questions</h1>
        <div className="buttons-header">
          <Button variant="link" onClick={() => navigate("/")}>Home Page</Button>
          <Button variant="link" onClick={() => navigate("/DetailedQuestions")}>Switch Quiz</Button>
        </div>
      </header>

      <Container className="BasicQuestions-body">
        <Row className="justify-content-center">
          <Col md={6} className="BasicQuestions-questionsContainers">
            <Row>
              <Col>
                <Dropdown className="BasicQuestions-questionsDropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Question {currentIndex + 1}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {questions.map((_, idx) => (
                      <Dropdown.Item key={idx} onClick={() => setCurrentIndex(idx)}>
                        Question {idx + 1}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h2 style={{marginLeft: '-25vw'}}>{currentQuestion.title}</h2>
              </Col>
            </Row>
            <p className="question-text">{currentQuestion.question}</p>
            <div className="options-container">
              {currentQuestion.options.map((opt) => (
                <Button
                  key={opt}
                  variant={answers[currentIndex] === opt ? "primary" : "outline-secondary"}
                  onClick={() => handleAnswerChange(opt)}
                  className="option-button"
                >
                  {opt}
                </Button>
              ))}
            </div>

            <div className="navigation-buttons">
              <Button onClick={goToPrevious} disabled={isFirst} className="me-2">
                Prev
              </Button>
              {isLast ? (
                <Button onClick={handleSubmit} disabled={loading || answers[currentIndex] === ""}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                </Button>
              ) : (
                <Button onClick={goToNext} disabled={answers[currentIndex] === ""}>Next</Button>
              )}
              <Button onClick={() => {handleAnswerChange("skipped"); goToNext();}} className="me-2">
                Skip
              </Button>
            </div>

            <ProgressBar now={progress} className="BasicQuestions-ProgressBar mt-3" />

            {recommendation && (
              <div className="recommendation-box mt-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={recommendation} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
