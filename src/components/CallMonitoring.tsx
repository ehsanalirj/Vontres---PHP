import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { socket } from '../services/socket';

interface Call {
  id: string;
  agent: string;
  customer: string;
  duration: number;
  status: 'active' | 'completed' | 'on-hold';
}

const CallMonitoring: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    socket.on('callUpdate', (updatedCall: Call) => {
      setCalls(prevCalls => {
        const index = prevCalls.findIndex(call => call.id === updatedCall.id);
        if (index !== -1) {
          const newCalls = [...prevCalls];
          newCalls[index] = updatedCall;
          return newCalls;
        } else {
          return [...prevCalls, updatedCall];
        }
      });
    });

    return () => {
      socket.off('callUpdate');
    };
  }, []);

  const columns = [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : status === 'on-hold' ? 'orange' : 'blue'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Active Calls</h2>
      <Table columns={columns} dataSource={calls} rowKey="id" />
    </div>
  );
};

export default CallMonitoring;