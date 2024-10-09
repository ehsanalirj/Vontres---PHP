import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioEnhancerProps {
  isCallActive: boolean;
}

const AudioEnhancer: React.FC<AudioEnhancerProps> = ({ isCallActive }) => {
  const [enhancementStatus, setEnhancementStatus] = useState('');

  useEffect(() => {
    if (isCallActive) {
      setEnhancementStatus('Audio enhancement active: Removing background noise and improving clarity.');
    } else {
      setEnhancementStatus('');
    }
  }, [isCallActive]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Audio Enhancer</h2>
      <div className="bg-green-100 p-4 rounded-lg min-h-[100px] flex items-center">
        {isCallActive ? (
          <div className="flex items-start">
            <Volume2 className="mr-2 text-green-500" size={24} />
            <p className="text-green-800">{enhancementStatus}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Audio enhancement will be activated during the call.</p>
        )}
      </div>
    </section>
  );
};

export default AudioEnhancer;