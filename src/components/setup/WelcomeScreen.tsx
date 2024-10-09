import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Welcome to Vontres AI!"
      subTitle="Your setup is complete. You're ready to start using the platform."
      extra={[
        <Button type="primary" key="dashboard" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>,
      ]}
    />
  );
};

export default WelcomeScreen;