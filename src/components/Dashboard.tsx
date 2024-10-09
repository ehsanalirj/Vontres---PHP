import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  SettingOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import AgentManagement from './AgentManagement';
import CallCenter from './CallCenter';
import Settings from './Settings';
import Overview from './Overview';

const { Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  const companyDetails = useSelector((state: RootState) => state.setup.companyDetails);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Overview
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Agent Management
          </Menu.Item>
          <Menu.Item key="3" icon={<PhoneOutlined />}>
            Call Center
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <h1>{companyDetails.name} Dashboard</h1>
          {/* Add routing for different dashboard sections */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;