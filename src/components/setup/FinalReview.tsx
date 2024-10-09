import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Descriptions, message } from 'antd';
import { useHistory } from 'react-router-dom';

const FinalReview: React.FC = () => {
  const history = useHistory();
  const setupData = useSelector((state: RootState) => state.setup);

  const handleComplete = async () => {
    try {
      // Call API to finalize setup
      await api.post('/setup/complete');
      message.success('Setup completed successfully!');
      history.push('/dashboard');
    } catch (error) {
      message.error('Error completing setup. Please try again.');
    }
  };

  return (
    <div>
      <h2>Final Review</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Company Name">{setupData.companyDetails.name}</Descriptions.Item>
        <Descriptions.Item label="Custom Domain">{setupData.companyDetails.customDomain}</Descriptions.Item>
        <Descriptions.Item label="Departments">{setupData.departments.join(', ')}</Descriptions.Item>
        <Descriptions.Item label="Roles">{setupData.roles.map(role => role.name).join(', ')}</Descriptions.Item>
        {/* Add more items to review */}
      </Descriptions>
      <Button type="primary" onClick={handleComplete}>
        Complete Setup
      </Button>
    </div>
  );
};

export default FinalReview;