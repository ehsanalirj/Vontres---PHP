import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import AIPrompter from '../AI/AIPrompter';
import CallStats from '../Call/CallStats';
import LiveTranscription from '../Call/LiveTranscription';
import WebDialer from '../Call/WebDialer';

const AgentDashboard: React.FC = () => {
  const [calls, setCalls] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('call_update', (updatedCall) => {
      setCalls((prevCalls) =>
        prevCalls.map((call) => (call.id === updatedCall.id ? updatedCall : call))
      );
    });

    return () => newSocket.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="agent-dashboard"
    >
      <h1>Agent Dashboard</h1>
      <div className="dashboard-grid">
        <AIPrompter />
        <CallStats calls={calls} />
        <LiveTranscription />
        <WebDialer socket={socket} />
      </div>
    </motion.div>
  );
};

export default AgentDashboard;