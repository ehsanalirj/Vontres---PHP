import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaUser, FaClock, FaStar } from 'react-icons/fa';

const DemoDashboard: React.FC = () => {
  const stats = [
    { icon: <FaPhone />, label: 'Total Calls', value: '1,234' },
    { icon: <FaUser />, label: 'Active Agents', value: '12' },
    { icon: <FaClock />, label: 'Avg. Handle Time', value: '3m 45s' },
    { icon: <FaStar />, label: 'CSAT Score', value: '4.8' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.svg" alt="Vontres AI" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">Demo Account</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Your Demo Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-2xl text-blue-500">
                      {item.icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {item.label}
                        </dt>
                        <dd className="text-lg font-bold text-gray-900">
                          {item.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
            {/* Add a table or list of recent calls here */}
          </div>

          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
            {/* Add AI-generated insights or suggestions here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoDashboard;