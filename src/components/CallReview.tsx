import React, { useState, useEffect } from 'react';
import { Card, List, Button } from 'antd';
import { AIFeedbackService } from '../services/AIFeedbackService';

const CallReview: React.FC<{ callId: string }> = ({ callId }) => {
  const [call, setCall] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const aiFeedbackService = new AIFeedbackService();

  useEffect(() => {
    const fetchCall = async () => {
      const callData = await Call.findById(callId);
      setCall(callData);
    };
    fetchCall();
  }, [callId]);

  const handleAnalyze = async () => {
    if (call && call.transcript) {
      const agentSuggestions = await aiFeedbackService.generateAgentSuggestions(call.transcript);
      setSuggestions(agentSuggestions);
      await aiFeedbackService.analyzeCallAndImproveScript(callId);
    }
  };

  if (!call) return <div>Loading...</div>;

  return (
    <div>
      <Card title="Call Review">
        <p><strong>Date:</strong> {new Date(call.createdAt).toLocaleString()}</p>
        <p><strong>Duration:</strong> {call.duration} seconds</p>
        <p><strong>Outcome:</strong> {call.outcome}</p>
        <Button onClick={handleAnalyze}>Analyze Call</Button>
      </Card>
      {suggestions.length > 0 && (
        <Card title="AI Suggestions" style={{ marginTop: 16 }}>
          <List
            dataSource={suggestions}
            renderItem={(item: string) => (
              <List.Item>{item}</List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default CallReview;