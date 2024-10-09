import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCalls, evaluateCall } from '../store/actions/qaActions';

const { Option } = Select;

const QADashboard: React.FC = () => {
  const dispatch = useDispatch();
  const calls = useSelector((state: RootState) => state.qa.calls);
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  const columns = [
    { title: 'Agent', dataIndex: ['agent', 'name'], key: 'agent' },
    { title: 'Customer', dataIndex: ['customer', 'name'], key: 'customer' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Actions', key: 'actions',
      render: (text: string, record: any) => (
        <Button onClick={() => handleEvaluate(record)}>Evaluate</Button>
      )
    },
  ];

  const handleEvaluate = (call: any) => {
    setSelectedCall(call);
    setEvaluationModalVisible(true);
  };

  const onFinishEvaluation = (values: any) => {
    dispatch(evaluateCall(selectedCall.id, values));
    setEvaluationModalVisible(false);
  };

  return (
    <div>
      <h2>Quality Assurance Dashboard</h2>
      <Table columns={columns} dataSource={calls} rowKey="id" />

      <Modal
        title="Call Evaluation"
        visible={evaluationModalVisible}
        onCancel={() => setEvaluationModalVisible(false)}
        width={1000}
        footer={null}
      >
        {selectedCall && (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: 20 }}>
              <h3>Call Details</h3>
              <p><strong>Agent:</strong> {selectedCall.agent.name}</p>
              <p><strong>Customer:</strong> {selectedCall.customer.name}</p>
              <p><strong>Date:</strong> {selectedCall.date}</p>
              <p><strong>Duration:</strong> {selectedCall.duration}</p>
              <h4>Call Recording</h4>
              <audio controls src={selectedCall.recordingUrl} />
              <h4>Transcript</h4>
              <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
                {selectedCall.transcript}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3>Evaluation Form</h3>
              <Form onFinish={onFinishEvaluation}>
                <Form.Item name="greeting" label="Proper Greeting" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>
                <Form.Item name="listening" label="Active Listening" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>
                <Form.Item name="problemSolving" label="Problem Solving" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>
                <Form.Item name="communication" label="Clear Communication" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>
                <Form.Item name="closing" label="Proper Closing" rules={[{ required: true }]}>
                  <Rate />
                </Form.Item>
                <Form.Item name="comments" label="Comments">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Submit Evaluation</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QADashboard;