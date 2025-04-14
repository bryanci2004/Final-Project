import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './HomePage.css'
import { useState } from "react";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


function HomePage() {

    const navigate = useNavigate();
    const [key, setKey] = useState<string>(keyData); //for api key input
      
    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }
    
    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
        setKey(event.target.value);
    }
    

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
                        Are you ready to unlock your full potential? Take our AI-powered career quiz and 
                        get personalized insights into the best career paths for you. Whether you're looking 
                        for a quick recommendation or an in-depth analysis, we’ve got you covered!
                    </p>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={5} className="HomePage-questionsContainers">
                        <h2>Quick & Easy: The Basic Career Quiz</h2>
                        <p>
                            Short on time? No worries! Answer a few simple questions and get an instant recommendation 
                            for careers that match your interests and skills.
                        </p>
                        <Button onClick={() => navigate("/BasicQuestions")}>Basic Questions</Button>
                    </Col>
                    <Col md={5} className="HomePage-questionsContainers">
                        <h2>Dive Deep: The Detailed Career Quiz</h2>
                        <p>
                            Want a more in-depth analysis? Our detailed quiz asks about your preferences, strengths, and aspirations 
                            to give you highly personalized career recommendations.
                        </p>
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
                    onChange={changeKey} 
                    style={{ width: '550px' }} // Adjust width as needed
                />
                <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
                <Button onClick={() => navigate("/ChatGPTAPI")}>ChatGPTAPI</Button>
            </Form>
            </div>
        </>
    );
}

export default HomePage;
