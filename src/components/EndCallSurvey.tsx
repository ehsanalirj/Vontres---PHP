import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Switch, Button, message } from 'antd';
import { createCallSurvey } from '../store/actions/callActions';

const { TextArea } = Input;

interface EndCallSurveyProps {
  callId: string;
  customerId: string;
  onComplete: () => void;
}

const EndCallSurvey: React.FC<EndCallSurveyProps> = ({ callId, customerId, onComplete }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      await dispatch(createCallSurvey({ ...values, call: callId, customer: customerId }));
      message.success('Call survey submitted successfully');
      onComplete();
    } catch (error) {
      message.error('Failed to submit call survey');
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="reachOutReason" label="Reason for Reaching Out" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="summary" label="Call Summary" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="resolved" label="Issue Resolved" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="additionalNotes" label="Additional Notes">
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Survey
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EndCallSurvey;