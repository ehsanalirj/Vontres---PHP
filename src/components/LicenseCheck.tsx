import React, { useState, useEffect } from 'react';
import { LicenseService } from '../services/LicenseService';

const LicenseCheck: React.FC = ({ children }) => {
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkLicense = async () => {
      const licenseService = new LicenseService(
        process.env.REACT_APP_LICENSE_KEY,
        process.env.REACT_APP_LICENSE_SERVER_URL
      );
      const isValid = await licenseService.validateLicense();
      setIsLicenseValid(isValid);
      setIsChecking(false);
    };

    checkLicense();
  }, []);

  if (isChecking) {
    return <div>Checking license...</div>;
  }

  if (!isLicenseValid) {
    return <div>Invalid license. Please contact support.</div>;
  }

  return <>{children}</>;
};

export default LicenseCheck;