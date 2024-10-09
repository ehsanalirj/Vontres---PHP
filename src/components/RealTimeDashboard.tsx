import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { PhoneOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import io from 'socket.io-client';

const RealTimeDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    activeCalls: 0,
    availableAgents: 0,
    averageHandleTime: 0,
    callVolume: []
  });

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('dashboard_update', (data) => {
      setStats(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const config = {
    data: stats.callVolume,
    xField: 'time',
    yField: 'calls',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v: string) => `${v} calls`,
      },
    },
    legend: { position: 'top' },
  };

  return (
    <div>
      <h2>Real-Time Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Calls"
              value={stats.activeCalls}
              prefix={<PhoneOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Available Agents"
              value={stats.availableAgents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Handle Time"
              value={stats.averageHandleTime}
              suffix="sec"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 16 }}>
        <h3>Call Volume Trend</h3>
        <Line {...config} />
      </Card>
    </div>
  );
};

export default RealTimeDashboard;