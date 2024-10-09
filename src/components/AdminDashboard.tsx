import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const data = [
    { name: 'Team A', calls: 4000, conversions: 2400 },
    { name: 'Team B', calls: 3000, conversions: 1398 },
    { name: 'Team C', calls: 2000, conversions: 9800 },
    { name: 'Team D', calls: 2780, conversions: 3908 },
    { name: 'Team E', calls: 1890, conversions: 4800 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Team Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calls" fill="#8884d8" />
              <Bar dataKey="conversions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">System Status</h2>
          {/* Add system status information here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;