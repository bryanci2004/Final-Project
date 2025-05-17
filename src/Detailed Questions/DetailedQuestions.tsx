// Imports
import { Button, Col, Container, Dropdown, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './DetailedQuestions.css';
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { askChatGPT } from "../chatgptService";

// Static assets
import logo from './Logo.png';
import background from './4Z_2101.w020.n001.999A.p30.999.jpg';

/**
 * DetailedQuestions component
 * 
 * Displays 10 open-ended questions designed to extract deeper user preferences.
 * Submits answers to ChatGPT to generate 3 career recommendations based on responses.
 */
function DetailedQuestions() {
  const navigate = useNavigate();

  // Questions list: Each question has a title and the actual prompt
  const questions = [
    {
      title: "Long-Term Career Goals",
      question: "How does your daily commute impact your overall job satisfaction and long-term career goals? Would a shorter or more flexible commute change how you view your current or future roles?",
    },
    {
      title: "Work Preferences",
      question: "What aspects of remote versus in-office work environments do you find most energizing or draining? How do these preferences influence your productivity, creativity, and sense of connection with your team?",
    },
    {
      title: "Collaboration Style",
      question: "When collaborating on a project, what role do you naturally gravitate toward, and how does working in a team setting challenge or enhance your effectiveness? How do you handle differences in work styles or opinions?",
    },
    {
      title: "Learning Preferences",
      question: "Can you describe a time when you successfully learned a new skill or concept—what methods helped you most? How do you adapt your learning style based on the complexity or urgency of a situation?",
    },
    {
      title: "Work-Life Balance",
      question: "How do you define a healthy work-life balance for yourself, and what boundaries or routines help you maintain it? How has your view of balance evolved throughout your career or personal life?",
    },
    {
      title: "Time Management",
      question: "When during the day do you feel most focused and productive, and how do you structure your time to align with your natural energy cycles? Have you developed any personal routines that significantly improve your time management?",
    },
    {
      title: "Job Security",
      question: "How do you evaluate risk and stability when making career decisions? What trade-offs are you willing to accept for greater security or greater opportunity, and how do those choices reflect your personal values or goals?",
    },
    {
      title: "Motivation Drivers",
      question: "What motivates you most in a work setting—recognition, autonomy, impact, financial reward, or something else? How have these motivators shaped your past career decisions or ambitions?",
    },
    {
      title: "Ideal Work Environment",
      question: "Describe the type of physical and social work environment where you feel you thrive. How do factors like noise level, pace, team size, or organizational structure influence your job satisfaction and performance?",
    },
    {
      title: "Handling Change",
      question: "How do you typically respond to change or uncertainty at work, such as a shift in responsibilities or a new leadership style? Can you share an example of how you've adapted to unexpected change in a positive way?",
    },
  ];

  // State to track current question card
  const [visibleCard, setVisibleCard] = useState(0);

  // User answers stored in an array of 10 strings (one per question)
  const [detailedQuestionsAnswers, setDetailedQuestionsAnswers] = useState(Array(10).fill(''));

  // Progress bar value (0-100)
  const [detailedQuestionsProgress, setDetailedQuestionsProgress] = useState(0);

  // ChatGPT integration states
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const isLast = visibleCard === questions.length - 1;
  const currentQuestion = questions[visibleCard];

  /**
   * Handles answer change for the current question
   * Updates progress bar accordingly
   */
  function handleAnswerChange(index: number, value: string) {
    const updatedAnswers = [...detailedQuestionsAnswers];
    updatedAnswers[index] = value;
    setDetailedQuestionsAnswers(updatedAnswers);

    const answeredCount = updatedAnswers.filter(ans => ans.trim() !== '').length;
    const progress = (answeredCount / questions.length) * 100;
    setDetailedQuestionsProgress(progress);
  }

  /**
   * Handles submission to ChatGPT API
   * Constructs prompt using questions and user answers
   * Updates recommendation state with GPT response
   */
  async function handleSubmit(): Promise<void> {
    setLoading(true);
    console.log("All detailed answers:", detailedQuestionsAnswers);

    // Combine question-answer pairs
    const qaLines = questions.map((q, i) =>
      `Q${i + 1}: ${q.question}\nA${i + 1}: ${detailedQuestionsAnswers[i] || "(no answer)"}`
    ).join("\n\n");

    // GPT prompt template
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

  return (
    <>
      {/* Header Section */}
      <header className="BasicQuestions-header">
        <div className="logo-container">
          <img src={logo} alt="a logo" className="logo-img" />
        </div>
        <div className="title-container-BQ">
          <h1 className="homepage-title">DepthQuest</h1>
        </div>
        <div className="buttons-header">
          <Button onClick={() => navigate("/")}>Home Page</Button>
          <Button onClick={() => navigate("/BasicQuestions")}>Switch Quiz</Button>
        </div>
      </header>

      {/* Body Container */}
      <Container
        className="DetailedQuestions-body"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Row className="justify-content-center mt-4">
          <Col md={5} className="DetailedQuestions-questionsContainers">
            {/* Dropdown + Title */}
            <Row>
              <Col>
                <Dropdown className="BasicQuestions-questionsDropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic"
                    style={{ backgroundColor: '#013761', borderColor: '#013761', boxShadow: '0 0 0 0.001rem #013761' }}>
                    Question {visibleCard + 1}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {questions.map((_, idx) => (
                      <Dropdown.Item key={idx} onClick={() => setVisibleCard(idx)}>Question {idx + 1}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h2 style={{ marginLeft: '-25vw' }}>{currentQuestion.title}</h2>
              </Col>
            </Row>

            {/* Question Prompt */}
            <h5>{currentQuestion.question}</h5>

            {/* Answer Form */}
            <Form className="d-flex flex-column align-items-start gap-3 mt-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your answer here..."
                value={detailedQuestionsAnswers[visibleCard]}
                onChange={(e) => handleAnswerChange(visibleCard, e.target.value)}
                style={{ height: '35vh' }}
              />
            </Form>
            <br></br>
            {/* Submit Button */}
            <Row>
                <Button
                onClick={handleSubmit}
                disabled={!isLast || loading}>
                {loading
                    ? <Spinner animation="border" size="sm" />
                    : "Submit Assessment"}
                </Button>
            </Row>

            {/* GPT Career Recommendation Output */}
            {recommendation && (
              <div className="recommendation-box mt-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={recommendation} />
              </div>
            )}
          </Col>
        </Row>

        {/* Navigation Buttons: Prev / Next / Skip */}
        <div className="navigation-buttons">
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
            disabled={visibleCard === questions.length - 1 || detailedQuestionsAnswers[visibleCard].trim() === ''}
          >
            Next
          </Button>
          <Button
            style={{ margin: '2%', width: '100px' }}
            onClick={() => {
              const updatedAnswers = [...detailedQuestionsAnswers];
              updatedAnswers[visibleCard] = '';
              setDetailedQuestionsAnswers(updatedAnswers);

              const answeredCount = updatedAnswers.filter(ans => ans.trim() !== '').length;
              const progress = (answeredCount / questions.length) * 100;
              setDetailedQuestionsProgress(progress);

              setVisibleCard((prev) => Math.min(questions.length - 1, prev + 1));
            }}
            disabled={visibleCard === questions.length - 1}
          >
            Skip
          </Button>
        </div>

        {/* Progress Bar */}
        <Row>
          <Col className="d-flex justify-content-center">
            <progress value={detailedQuestionsProgress} max={100} className="DetailedQuestions-ProgressBar" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailedQuestions;
