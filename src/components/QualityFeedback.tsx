import React, { useState, useEffect } from 'react';

const QualityFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Simulating AI-generated quality feedback
    const generateFeedback = () => {
      const feedbackItems = [
        "Great job on addressing the customer's concerns promptly.",
        "Try to speak a bit slower to improve clarity.",
        "Remember to emphasize the key benefits of our product.",
        "Good use of open-ended questions to engage the prospect.",
        "Consider providing more specific examples tailored to the customer's industry.",
      ];
      setFeedback(feedbackItems[Math.floor(Math.random() * feedbackItems.length)]);
    };

    generateFeedback();
    const interval = setInterval(generateFeedback, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Quality Feedback</h2>
      <p className="text-gray-700">{feedback}</p>
    </div>
  );
};

export default QualityFeedback;