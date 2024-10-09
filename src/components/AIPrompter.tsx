import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface AIPrompterProps {
  isCallActive: boolean;
}

const AIPrompter: React.FC<AIPrompterProps> = ({ isCallActive }) => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (isCallActive) {
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
    }
  }, [isCallActive]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI Prompter</h2>
      <div className="bg-blue-100 p-4 rounded-lg min-h-[100px] flex items-center">
        {isCallActive ? (
          <div className="flex items-start">
            <MessageSquare className="mr-2 text-blue-500" size={24} />
            <p className="text-blue-800">{prompt}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">AI prompts will appear here during the call.</p>
        )}
      </div>
    </section>
  );
};

export default AIPrompter;