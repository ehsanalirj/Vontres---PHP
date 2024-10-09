import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';

interface BehaviorDetectorProps {
  isCallActive: boolean;
}

const BehaviorDetector: React.FC<BehaviorDetectorProps> = ({ isCallActive }) => {
  const [agentFeedback, setAgentFeedback] = useState('');
  const [prospectInsight, setProspectInsight] = useState('');

  useEffect(() => {
    if (isCallActive) {
      // Simulating behavior detection and feedback
      const interval = setInterval(() => {
        const agentFeedbacks = [
          "Your tone is confident. Keep it up!",
          "Try to speak a bit slower for clarity.",
          "Great job addressing the prospect's concerns.",
          "Remember to maintain a positive attitude.",
        ];
        const prospectInsights = [
          "The prospect seems interested. Try to elaborate on the benefits.",
          "The prospect might have some hesitations. Address potential concerns.",
          "The prospect's tone indicates they're open to more information.",
          "The prospect might be in a hurry. Consider scheduling a follow-up.",
        ];
        setAgentFeedback(agentFeedbacks[Math.floor(Math.random() * agentFeedbacks.length)]);
        setProspectInsight(prospectInsights[Math.floor(Math.random() * prospectInsights.length)]);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isCallActive]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Behavior Detector</h2>
      <div className="space-y-4">
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Agent Feedback:</h3>
          {isCallActive ? (
            <p className="text-purple-700">{agentFeedback}</p>
          ) : (
            <p className="text-gray-500 italic">Agent feedback will appear here during the call.</p>
          )}
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Prospect Insight:</h3>
          {isCallActive ? (
            <p className="text-yellow-700">{prospectInsight}</p>
          ) : (
            <p className="text-gray-500 italic">Prospect insights will appear here during the call.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BehaviorDetector;