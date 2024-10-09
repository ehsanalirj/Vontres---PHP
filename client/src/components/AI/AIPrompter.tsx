import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AIPrompter: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // Simulating AI-generated prompts
    const interval = setInterval(() => {
      const prompts = [
        "Remember to emphasize the product's unique selling points.",
        "Try to address any concerns the prospect might have.",
        "Don't forget to ask open-ended questions to engage the prospect.",
        "Highlight the benefits of our solution for their specific industry.",
      ];
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="ai-prompter"
    >
      <h2>AI Prompter</h2>
      <p>{prompt}</p>
    </motion.div>
  );
};

export default AIPrompter;