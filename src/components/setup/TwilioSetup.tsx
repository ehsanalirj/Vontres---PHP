import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { saveTwilioSettings } from '../../store/actions/setupActions';

const TwilioSetup: React.FC = () => {
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      await dispatch(saveTwilioSettings(values));
      message.success('Twilio settings saved successfully');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(`Error: ${error.response.data.message}`);
      } else {
        message.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Form onFinish={onFinish}>
      {/* Form items */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Twilio Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TwilioSetup;