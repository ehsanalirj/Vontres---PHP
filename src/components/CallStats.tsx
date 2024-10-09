import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CallStats: React.FC = () => {
  const data = [
    { name: 'Today', completed: 15, abandoned: 3, refused: 2 },
    { name: 'This Week', completed: 75, abandoned: 12, refused: 8 },
    { name: 'This Month', completed: 300, abandoned: 45, refused: 30 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Call Statistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#4CAF50" />
          <Bar dataKey="abandoned" fill="#FFC107" />
          <Bar dataKey="refused" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallStats;