import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState([]);
  const [agents, setAgents] = useState([]);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const companiesRes = await axios.get('/api/company');
      setCompanies(companiesRes.data);

      const agentsRes = await axios.get('/api/agent');
      setAgents(agentsRes.data);

      const callsRes = await axios.get('/api/call');
      setCalls(callsRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div>Total Companies: {companies.length}</div>
        <div>Total Agents: {agents.length}</div>
        <div>Total Calls: {calls.length}</div>
      </div>
      {/* Add more detailed components for companies, agents, and calls */}
    </div>
  );
};

export default AdminDashboard;