// src/HomePage.tsx

// ─── React Imports ────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// ─── Asset Imports ────────────────────────────────────────────────────────────────
import "./HomePage.css";
import background from './rjp7_fazl_230302.jpg';
import logo from './Logo.png';

// ─── Constants ─────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "MYKEY"; // Key used to store/retrieve API key in localStorage

/**
 * HomePage Component
 * Displays the landing page for DepthQuest, allowing users to:
 * - Read an intro message
 * - Choose between basic or detailed career quizzes
 * - Enter and store an API key locally
 */
function HomePage(): JSX.Element {
  const navigate = useNavigate(); // Enables navigation to other routes/pages

  // ─── API Key State & Handlers ───────────────────────────────────────────────────
  const [key, setKey] = useState<string>(""); // Stores user-inputted API key

  /**
   * On mount, check if an API key exists in localStorage and set it in state
   */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setKey(JSON.parse(saved)); // Parse and set saved key
      } catch {
        // Handle malformed JSON gracefully
      }
    }
  }, []);

  /**
   * Updates the key state whenever the input field changes
   * @param e - React ChangeEvent from the input
   */
  const changeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  /**
   * Saves the current key value to localStorage and alerts the user
   */
  const handleSubmitKey = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(key));
    alert("API key saved! Please reload the page to apply changes.");
  };
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ─── Header Section with Logo and Title ─────────────────────────────────── */}
      <header className="HomePage-header">
        <div className="logo-container">
          <img src={logo} alt="a logo" className="logo-img" />
        </div>
        <div className="title-container">
          <h1 className="homepage-title">DepthQuest</h1>
        </div>
      </header>

      {/* ─── Main Body Section with Background and Quiz Options ──────────────────── */}
      <div
        className="HomePage-body"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: '1920px',
        }}
      >
        <Container>
          {/* ─── Welcome Message ─────────────────────────────────────────────── */}
          <Row className="justify-content-center text-center">
            <h1>Embark on Your Career Voyage!</h1>
            <p className="lead">
              Welcome aboard <strong>DepthQuest</strong> — where your career journey dives deep.
              Navigate your future with our AI-powered quiz that surfaces personalized career paths
              based on your unique talents and aspirations. Whether you're testing the waters
              or diving into the depths, your next big adventure begins here.
            </p>
          </Row>

          {/* ─── Quiz Option Cards ───────────────────────────────────────────── */}
          <Row className="justify-content-center mt-4">
            <Col md={5} className="HomePage-questionsContainers">
              <h2>Shallow Waters: The Basic Career Quiz</h2>
              <p>
                Short on time? Answer a few simple questions and get an instant recommendation for
                careers that match your interests and skills.
              </p>
              <Button onClick={() => navigate("/BasicQuestions")}>
                Basic Questions
              </Button>
            </Col>

            <Col md={5} className="HomePage-questionsContainers">
              <h2>Dive Deep: The Detailed Career Quiz</h2>
              <p>
                Want a more in-depth analysis? Our detailed quiz asks about your preferences,
                strengths, and aspirations to give you highly personalized career recommendations.
              </p>
              <Button onClick={() => navigate("/DetailedQuestions")}>
                Detailed Questions
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ─── Footer Section with API Key Input ───────────────────────────────────── */}
      <div className="HomePage-footer text-center">
        <Form className="d-flex justify-content-center align-items-center gap-3">
          <Form.Label className="mb-0">
            <strong>API Key:</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            value={key}                 // Controlled input
            onChange={changeKey}        // Updates state on change
            style={{ width: '550px' }}
          />
          <Button onClick={handleSubmitKey}>Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default HomePage;
