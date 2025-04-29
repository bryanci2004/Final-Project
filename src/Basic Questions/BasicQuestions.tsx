import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { askChatGPT } from "../ChatGPT_API/chatgptService";
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

  const handleAnswerChange = (option: string) => {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
    const answeredCount = updated.filter((ans) => ans.trim() !== "").length;
    setProgress((answeredCount / questions.length) * 100);
  };

  const goToPrevious = () => {
    if (!isFirst) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  const goToNext = () => {
    if (!isLast) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    const prompt = [
      "A user completed the basic career quiz with these answers:",
      ...answers.map((ans, i) => `Q${i + 1}: ${ans || "(no answer)"}`),
      "\nBased on these responses, suggest 2–3 suitable career paths and explain why.",
    ].join("\n");

    try {
      const rec = await askChatGPT(prompt);
      setRecommendation(rec);
    } catch {
      setRecommendation("❗ Error: please check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

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
            <h2>{currentQuestion.title}</h2>
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
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                </Button>
              ) : (
                <Button onClick={goToNext}>Next</Button>
              )}
            </div>

            <ProgressBar now={progress} className="BasicQuestions-ProgressBar mt-3" />

            {recommendation && (
              <div className="recommendation-box mt-4">
                {recommendation}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
