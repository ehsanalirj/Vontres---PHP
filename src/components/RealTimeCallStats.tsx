import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { socket } from '../services/socket';

const RealTimeCallStats: React.FC = () => {
  const [callData, setCallData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Active Calls',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    socket.on('callUpdate', (data) => {
      setCallData(prevData => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, data.activeCalls]
          }
        ]
      }));
    });

    return () => {
      socket.off('callUpdate');
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Real-Time Call Volume</h2>
      <Line data={callData} />
    </div>
  );
};

export default RealTimeCallStats;