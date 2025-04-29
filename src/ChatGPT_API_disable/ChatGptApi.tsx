import React, { useState, ChangeEvent } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { askChatGPT } from './chatgptService';

function ChatGPTAPI(): JSX.Element {
  const [prompt, setPrompt] = useState<string>('');
  const [reply, setReply] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const onSend = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const response = await askChatGPT(prompt);
      setReply(response);
    } catch {
      setReply('❗ Error: please check your API key or network.');
    }
    setIsLoading(false);
  };

  return (
    <Container style={{ maxWidth: 600, marginTop: 40 }}>
      <h2>ChatGPT Playground</h2>

      <Form.Group className="mb-3">
        <Form.Label>Your prompt:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={prompt}
          onChange={onPromptChange}
          placeholder="Type a question here…"
        />
      </Form.Group>

      <Button onClick={onSend} disabled={isLoading || !prompt.trim()}>
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{' '}
            Thinking…
          </>
        ) : (
          'Send'
        )}
      </Button>

      {reply && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#fafafa',
            whiteSpace: 'pre-wrap',
          }}
        >
          {reply}
        </div>
      )}
    </Container>
  );
}

export default ChatGPTAPI;
