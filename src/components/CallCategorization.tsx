import React, { useState } from 'react';
import { Card, Input, Button, Tag } from 'antd';
import { NLPService } from '../services/NLPService';

const { TextArea } = Input;

const CallCategorization: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [sentiment, setSentiment] = useState<any>(null);
  const [translation, setTranslation] = useState('');
  const nlpService = new NLPService();

  const handleAnalyzeSentiment = async () => {
    const result = await nlpService.analyzeSentiment(transcript);
    setSentiment(result);
  };

  const handleTranslate = async () => {
    const result = await nlpService.translateText(transcript, 'es'); // Translate to Spanish as an example
    setTranslation(result);
  };

  return (
    <Card title="Call Categorization">
      <TextArea
        rows={4}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Enter call transcript"
      />
      <Button onClick={handleAnalyzeSentiment} style={{ marginTop: 16, marginRight: 8 }}>
        Analyze Sentiment
      </Button>
      <Button onClick={handleTranslate} style={{ marginTop: 16 }}>
        Translate
      </Button>
      {sentiment && (
        <div style={{ marginTop: 16 }}>
          <h3>Sentiment Analysis:</h3>
          <p>Score: {sentiment.score}</p>
          <p>Magnitude: {sentiment.magnitude}</p>
          <Tag color={sentiment.score > 0 ? 'green' : sentiment.score < 0 ? 'red' : 'orange'}>
            {sentiment.score > 0 ? 'Positive' : sentiment.score < 0 ? 'Negative' : 'Neutral'}
          </Tag>
        </div>
      )}
      {translation && (
        <div style={{ marginTop: 16 }}>
          <h3>Translation:</h3>
          <p>{translation}</p>
        </div>
      )}
    </Card>
  );
};

export default CallCategorization;