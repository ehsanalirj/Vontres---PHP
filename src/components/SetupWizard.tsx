import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Steps, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import CompanyDetails from './setup/CompanyDetails';
import DepartmentSetup from './setup/DepartmentSetup';
import RoleSetup from './setup/RoleSetup';
import HierarchySetup from './setup/HierarchySetup';
import TwilioSetup from './setup/TwilioSetup';
import OpenAISetup from './setup/OpenAISetup';
import ScriptingSetup from './setup/ScriptingSetup';
import EmailSetup from './setup/EmailSetup';
import FinalReview from './setup/FinalReview';
import { saveSetupProgress, skipWizard } from '../store/actions/setupActions';

const { Step } = Steps;

const SetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const steps = [
    { title: 'Company Details', content: <CompanyDetails /> },
    { title: 'Departments', content: <DepartmentSetup /> },
    { title: 'Roles', content: <RoleSetup /> },
    { title: 'Hierarchy', content: <HierarchySetup /> },
    { title: 'Twilio Setup', content: <TwilioSetup /> },
    { title: 'OpenAI Setup', content: <OpenAISetup /> },
    { title: 'Scripting', content: <ScriptingSetup /> },
    { title: 'Email Setup', content: <EmailSetup /> },
    { title: 'Review', content: <FinalReview /> },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
    dispatch(saveSetupProgress(currentStep + 1));
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
    dispatch(saveSetupProgress(currentStep - 1));
  };

  const handleSkipWizard = () => {
    dispatch(skipWizard());
    history.push('/dashboard');
  };

  return (
    <div className="setup-wizard">
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => history.push('/dashboard')}>
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        <Button onClick={handleSkipWizard}>Skip Wizard</Button>
      </div>
    </div>
  );
};

export default SetupWizard;