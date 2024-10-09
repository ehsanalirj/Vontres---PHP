import React, { useState, useEffect } from 'react';
import { Card, Progress } from 'antd';
import { SentimentAnalysisService } from '../services/SentimentAnalysisService';

const LiveCallAnalysis: React.FC<{ callId: string }> = ({ callId }) => {
  const [sentiment, setSentiment] = useState(0);
  const [emotion, setEmotion] = useState('neutral');
  const sentimentService = new SentimentAnalysisService();

  useEffect(() => {
    const analyzeInterval = setInterval(async () => {
      // In a real scenario, you'd fetch the latest transcript chunk here
      const latestTranscript = await fetchLatestTranscript(callId);
      const analysis = await sentimentService.analyzeSentiment(latestTranscript);
      setSentiment(analysis.sentiment);
      setEmotion(analysis.emotion);
    }, 10000); // Analyze every 10 seconds

    return () => clearInterval(analyzeInterval);
  }, [callId]);

  return (
    <Card title="Live Call Analysis">
      <Progress
        type="circle"
        percent={(sentiment + 1) * 50}
        format={() => sentiment.toFixed(2)}
      />
      <p>Current Emotion: {emotion}</p>
    </Card>
  );
};

async function fetchLatestTranscript(callId: string): Promise<string> {
  // Implement the logic to fetch the latest transcript chunk
  return "Sample transcript text";
}

export default LiveCallAnalysis;