import React from 'react';
import { Form, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const CompanyDetails: React.FC = () => {
  return (
    <Form layout="vertical">
      <Form.Item
        name="name"
        label="Company Name"
        rules={[{ required: true, message: 'Please input your company name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="customDomain"
        label={
          <span>
            Custom Domain&nbsp;
            <Tooltip title="Enter your desired subdomain. It will be accessible at yourdomain.vontres.ai">
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Input addonBefore="https://" addonAfter=".vontres.ai" />
      </Form.Item>
      {/* Add more form items with tooltips */}
    </Form>
  );
};

export default CompanyDetails;