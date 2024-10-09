import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AIPrompter = () => {
  const [prompt, setPrompt] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('ai-prompt', (data) => {
      setPrompt(data.prompt);
    });

    return () => newSocket.close();
  }, []);

  return (
    <div className="ai-prompter">
      <h3>AI Prompter</h3>
      <p>{prompt}</p>
    </div>
  );
};

export default AIPrompter;