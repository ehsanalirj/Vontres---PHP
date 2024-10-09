import React, { useState, useEffect } from 'react';

interface LiveTranscriptionProps {
  isActive: boolean;
}

const LiveTranscription: React.FC<LiveTranscriptionProps> = ({ isActive }) => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (isActive) {
      // Simulating live transcription
      const interval = setInterval(() => {
        setTranscript(prev => prev + ' ' + generateRandomSentence());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateRandomSentence = () => {
    const sentences = [
      "Thank you for your interest in our product.",
      "Could you tell me more about your needs?",
      "Our solution can help improve your efficiency.",
      "What challenges are you currently facing?",
      "I'd be happy to schedule a demo for you.",
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
  };

  if (!isActive) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Live Transcription</h2>
      <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded">
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default LiveTranscription;