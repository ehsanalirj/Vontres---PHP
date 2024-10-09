import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAgentStatuses, forceLogoutAgent } from '../store/actions/wfmActions';

const WFMDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const agentStatuses = useSelector((state: RootState) => state.wfm.agentStatuses);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAgentStatuses());
    const interval = setInterval(() => dispatch(fetchAgentStatuses()), 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  const columns = [
    { title: 'Agent Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'Available' ? 'green' :
          status === 'Break' ? 'orange' :
          status === 'Lunch' ? 'blue' :
          status === 'Coaching' ? 'purple' :
          'red'
        }>
          {status}
        </Tag>
      )
    },
    { title: 'Time in Status', dataIndex: 'timeInStatus', key: 'timeInStatus' },
    { title: 'Shift Start', dataIndex: 'shiftStart', key: 'shiftStart' },
    { title: 'Actions', key: 'actions',
      render: (text: string, record: any) => (
        <Button onClick={() => handleForceLogout(record)}>Force Logout</Button>
      )
    },
  ];

  const handleForceLogout = (agent: any) => {
    setSelectedAgent(agent);
    setModalVisible(true);
  };

  const confirmForceLogout = () => {
    if (selectedAgent) {
      dispatch(forceLogoutAgent(selectedAgent.id));
      setModalVisible(false);
    }
  };

  return (
    <div>
      <h2>Workforce Management Dashboard</h2>
      <Table columns={columns} dataSource={agentStatuses} rowKey="id" />
      <Modal
        title="Confirm Force Logout"
        visible={modalVisible}
        onOk={confirmForceLogout}
        onCancel={() => setModalVisible(false)}
      >
        <p>Are you sure you want to force logout {selectedAgent?.name}?</p>
      </Modal>
    </div>
  );
};

export default WFMDashboard;