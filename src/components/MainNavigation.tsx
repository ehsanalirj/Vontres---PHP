import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  PhoneOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const MainNavigation: React.FC = () => {
  return (
    <Menu mode="inline" theme="dark">
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <SubMenu key="calls" icon={<PhoneOutlined />} title="Calls">
        <Menu.Item key="dialer"><Link to="/calls/dialer">Dialer</Link></Menu.Item>
        <Menu.Item key="call-history"><Link to="/calls/history">Call History</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="agents" icon={<TeamOutlined />} title="Agents">
        <Menu.Item key="agent-management"><Link to="/agents/manage">Manage Agents</Link></Menu.Item>
        <Menu.Item key="agent-performance"><Link to="/agents/performance">Performance</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="quality" icon={<FileTextOutlined />} title="Quality">
        <Menu.Item key="qa-dashboard"><Link to="/quality/dashboard">QA Dashboard</Link></Menu.Item>
        <Menu.Item key="compliance"><Link to="/quality/compliance">Compliance</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="reports" icon={<BarChartOutlined />} title="Reports">
        <Menu.Item key="call-reports"><Link to="/reports/calls">Call Reports</Link></Menu.Item>
        <Menu.Item key="agent-reports"><Link to="/reports/agents">Agent Reports</Link></Menu.Item>
        <Menu.Item key="custom-reports"><Link to="/reports/custom">Custom Reports</Link></Menu.Item>
      </SubMenu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MainNavigation;