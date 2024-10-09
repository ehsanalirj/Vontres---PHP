import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    { title: 'Welcome', content: 'Welcome to Vontres AI! Let\'s get you set up.' },
    { title: 'Profile Setup', content: 'Let\'s set up your profile.' },
    { title: 'Dashboard Overview', content: 'Here\'s a quick overview of your dashboard.' },
    { title: 'Making Your First Call', content: 'Let\'s make your first call with Vontres AI.' },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{steps[step - 1].title}</h2>
        <div className="mt-4">{steps[step - 1].content}</div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {step === steps.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;