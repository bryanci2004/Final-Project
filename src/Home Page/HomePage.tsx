// src/HomePage.tsx
import React, { useState, useEffect } from "react";              // ← added useEffect
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const STORAGE_KEY = "MYKEY";

function HomePage(): JSX.Element {
  const navigate = useNavigate();

  // ─── API Key State & Handlers ───────────────────────────────────────────────────
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setKey(JSON.parse(saved));
      } catch {
        // ignore bad JSON
      }
    }
  }, []);

  const changeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleSubmitKey = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(key));
    // optional: give feedback
    alert("API key saved! Please reload the page to apply changes.");
  };
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <header className="HomePage-header">
        <h1>Home Page</h1>
      </header>

      <div className="HomePage-body">
        <Container>
          <Row className="justify-content-center text-center">
            <h1> Discover Your Dream Career with AI! </h1>
            <p className="lead">
              Are you ready to unlock your full potential? Take our AI-powered career
              quiz and get personalized insights into the best career paths for you.
              Whether you're looking for a quick recommendation or an in-depth
              analysis, we’ve got you covered!
            </p>
          </Row>

          <Row className="justify-content-center mt-4">
            <Col md={5} className="HomePage-questionsContainers">
              <h2>Quick & Easy: The Basic Career Quiz</h2>
              <p>Short on time? Answer a few simple questions and get an instant recommendation for careers that match your interests and skills.</p>
              <Button onClick={() => navigate("/BasicQuestions")}>Basic Questions</Button>
            </Col>

            <Col md={5} className="HomePage-questionsContainers">
              <h2>Dive Deep: The Detailed Career Quiz</h2>
              <p>Want a more in-depth analysis? Our detailed quiz asks about your preferences, strengths, and aspirations to give you highly personalized career recommendations.</p>
              <Button onClick={() => navigate("/DetailedQuestions")}>Detailed Questions</Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="HomePage-footer text-center mt-4">
        <Form className="d-flex justify-content-center align-items-center gap-3">
          <Form.Label className="mb-0"><strong>API Key:</strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            value={key}                    // ← controlled input
            onChange={changeKey}           // ← update state
            style={{ width: '550px' }}
          />
          <Button onClick={handleSubmitKey}>Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default HomePage;
