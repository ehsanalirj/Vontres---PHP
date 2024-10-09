import React, { useState } from 'react';
import axios from 'axios';
import RequirementsCheck from './RequirementsCheck';
import DatabaseSetup from './DatabaseSetup';
import AdminSetup from './AdminSetup';

const InstallWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [requirements, setRequirements] = useState(null);
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [adminCreated, setAdminCreated] = useState(false);

  const checkRequirements = async () => {
    const response = await axios.post('/install/check-requirements');
    setRequirements(response.data);
    if (response.data.allMet) setStep(2);
  };

  const setupDatabase = async (mongoUri: string) => {
    const response = await axios.post('/install/database-setup', { mongoUri });
    if (response.data.success) {
      setDatabaseConnected(true);
      setStep(3);
    }
  };

  const createAdmin = async (adminData: any) => {
    const response = await axios.post('/install/create-admin', adminData);
    if (response.data.success) {
      setAdminCreated(true);
      setStep(4);
    }
  };

  const finalizeInstallation = async () => {
    const response = await axios.post('/install/finalize');
    if (response.data.success) {
      // Redirect to login page or show success message
    }
  };

  return (
    <div className="install-wizard">
      <h1>VONTRES AI Installation</h1>
      {step === 1 && <RequirementsCheck onCheck={checkRequirements} requirements={requirements} />}
      {step === 2 && <DatabaseSetup onSetup={setupDatabase} />}
      {step === 3 && <AdminSetup onSetup={createAdmin} />}
      {step === 4 && (
        <div>
          <h2>Installation Complete</h2>
          <button onClick={finalizeInstallation}>Finish Installation</button>
        </div>
      )}
    </div>
  );
};

export default InstallWizard;