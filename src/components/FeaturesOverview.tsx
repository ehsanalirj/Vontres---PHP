import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaRobot className="text-4xl mb-4 text-blue-500" />,
    title: 'AI-Powered Assistance',
    description: 'Real-time AI suggestions and call analysis to improve agent performance.'
  },
  {
    icon: <FaChartLine className="text-4xl mb-4 text-green-500" />,
    title: 'Advanced Analytics',
    description: 'Comprehensive dashboards and reports for data-driven decision making.'
  },
  {
    icon: <FaHeadset className="text-4xl mb-4 text-purple-500" />,
    title: 'Omnichannel Support',
    description: 'Seamlessly manage calls, chats, emails, and social media interactions.'
  },
  {
    icon: <FaShieldAlt className="text-4xl mb-4 text-red-500" />,
    title: 'Compliance & Security',
    description: 'Ensure adherence to regulations with built-in compliance tools.'
  }
];

const FeaturesOverview: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesOverview;