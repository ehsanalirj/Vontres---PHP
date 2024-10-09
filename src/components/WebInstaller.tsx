import React, { useState } from 'react';
import axios from 'axios';

const WebInstaller: React.FC = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    dbUrl: '',
    adminEmail: '',
    adminPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/install', config);
      setStep(step + 1);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  return (
    <div className="web-installer">
      <h1>AI Cold Calling System Installer</h1>
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="dbUrl"
            value={config.dbUrl}
            onChange={handleInputChange}
            placeholder="Database URL"
            required
          />
          <button type="submit">Next</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="adminEmail"
            value={config.adminEmail}
            onChange={handleInputChange}
            placeholder="Admin Email"
            required
          />
          <input
            type="password"
            name="adminPassword"
            value={config.adminPassword}
            onChange={handleInputChange}
            placeholder="Admin Password"
            required
          />
          <button type="submit">Complete Installation</button>
        </form>
      )}
      {step === 3 && (
        <div>
          <h2>Installation Complete!</h2>
          <p>You can now log in to your AI Cold Calling System.</p>
        </div>
      )}
    </div>
  );
};

export default WebInstaller;