import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Switch, message } from 'antd';
import { saveOpenAISettings, verifyOpenAISettings } from '../../store/actions/setupActions';

const OpenAISetup: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      await dispatch(verifyOpenAISettings(values));
      dispatch(saveOpenAISettings(values));
      message.success('OpenAI settings verified and saved successfully');
    } catch (error) {
      message.error('Failed to verify OpenAI settings. Please check your API key.');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="apiKey" label="OpenAI API Key" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="useGPT4" label="Use GPT-4" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="maxTokens" label="Max Tokens" rules={[{ type: 'number', min: 1, max: 4096 }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Verify and Save OpenAI Settings</Button>
      </Form.Item>
    </Form>
  );
};

export default OpenAISetup;