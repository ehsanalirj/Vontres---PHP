import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings: React.FC = () => {
  const [company, setCompany] = useState({
    name: '',
    logo: '',
    favicon: '',
    smtp_host: '',
    smtp_port: '',
    smtp_username: '',
    smtp_password: '',
  });

  useEffect(() => {
    const fetchCompanySettings = async () => {
      const response = await axios.get('/api/company/settings');
      setCompany(response.data);
    };
    fetchCompanySettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/company/settings', company);
      // Handle successful update
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={company.name}
        onChange={(e) => setCompany({ ...company, name: e.target.value })}
        placeholder="Company Name"
      />
      <input
        type="file"
        onChange={(e) => setCompany({ ...company, logo: e.target.files[0] })}
        accept="image/*"
      />
      <input
        type="file"
        onChange={(e) => setCompany({ ...company, favicon: e.target.files[0] })}
        accept="image/x-icon"
      />
      <input
        type="text"
        value={company.smtp_host}
        onChange={(e) => setCompany({ ...company, smtp_host: e.target.value })}
        placeholder="SMTP Host"
      />
      <input
        type="text"
        value={company.smtp_port}
        onChange={(e) => setCompany({ ...company, smtp_port: e.target.value })}
        placeholder="SMTP Port"
      />
      <input
        type="text"
        value={company.smtp_username}
        onChange={(e) => setCompany({ ...company, smtp_username: e.target.value })}
        placeholder="SMTP Username"
      />
      <input
        type="password"
        value={company.smtp_password}
        onChange={(e) => setCompany({ ...company, smtp_password: e.target.value })}
        placeholder="SMTP Password"
      />
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default Settings;