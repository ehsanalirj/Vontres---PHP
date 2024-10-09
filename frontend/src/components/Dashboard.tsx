import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = async () => {
      const response = await axios.get('/api/calls');
      setCalls(response.data);
    };
    fetchCalls();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Display calls and other relevant information */}
    </div>
  );
};

export default Dashboard;