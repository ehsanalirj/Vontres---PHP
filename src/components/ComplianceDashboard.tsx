import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, Modal, Form, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPolicies, uploadPolicy, giveFeedback } from '../store/actions/complianceActions';

const { Option } = Select;

const ComplianceDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const policies = useSelector((state: RootState) => state.compliance.policies);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const policyColumns = [
    { title: 'Policy Name', dataIndex: 'name', key: 'name' },
    { title: 'Upload Date', dataIndex: 'uploadDate', key: 'uploadDate' },
    { title: 'Actions', key: 'actions',
      render: (text: string, record: any) => (
        <Button onClick={() => window.open(record.fileUrl, '_blank')}>View</Button>
      )
    },
  ];

  const agentColumns = [
    { title: 'Agent Name', dataIndex: 'name', key: 'name' },
    { title: 'Actions', key: 'actions',
      render: (text: string, record: any) => (
        <Button onClick={() => handleGiveFeedback(record)}>Give Feedback</Button>
      )
    },
  ];

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      dispatch(uploadPolicy(info.file.originFileObj));
    }
  };

  const handleGiveFeedback = (agent: any) => {
    setSelectedAgent(agent);
    setFeedbackModalVisible(true);
  };

  const onFinishFeedback = (values: any) => {
    dispatch(giveFeedback(selectedAgent.id, values));
    setFeedbackModalVisible(false);
  };

  return (
    <div>
      <h2>Compliance Dashboard</h2>
      <h3>Company Policies</h3>
      <Upload
        action="/api/upload-policy"
        onChange={handleUpload}
      >
        <Button icon={<UploadOutlined />}>Upload Policy</Button>
      </Upload>
      <Table columns={policyColumns} dataSource={policies} rowKey="id" />

      <h3>Agent Feedback</h3>
      <Table columns={agentColumns} dataSource={agents} rowKey="id" />

      <Modal
        title="Give Feedback"
        visible={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        footer={null}
      >
        <Form onFinish={onFinishFeedback}>
          <Form.Item name="feedbackType" label="Feedback Type" rules={[{ required: true }]}>
            <Select>
              <Option value="verbal">Verbal</Option>
              <Option value="written">Written</Option>
              <Option value="final">Final Warning</Option>
            </Select>
          </Form.Item>
          <Form.Item name="severity" label="Severity" rules={[{ required: true }]}>
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item name="comments" label="Comments" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit Feedback</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComplianceDashboard;