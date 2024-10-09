import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Select, message } from 'antd';
import { saveEmailSettings, verifyEmailSettings } from '../../store/actions/setupActions';

const { Option } = Select;

const EmailSetup: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      await dispatch(verifyEmailSettings(values));
      dispatch(saveEmailSettings(values));
      message.success('Email settings verified and saved successfully');
    } catch (error) {
      message.error('Failed to verify email settings. Please check your credentials.');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="smtpHost" label="SMTP Host" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="smtpPort" label="SMTP Port" rules={[{ required: true, type: 'number' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="smtpUsername" label="SMTP Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="smtpPassword" label="SMTP Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="encryption" label="Encryption" rules={[{ required: true }]}>
        <Select>
          <Option value="tls">TLS</Option>
          <Option value="ssl">SSL</Option>
        </Select>
      </Form.Item>
      <Form.Item name="fromEmail" label="From Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="fromName" label="From Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Verify and Save Email Settings</Button>
      </Form.Item>
    </Form>
  );
};

export default EmailSetup;