import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Vontres AI</div>
        <div>
          <Link to="/login" className="mr-4 hover:text-blue-200">Login</Link>
          <Link to="/demo" className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100">Request Demo</Link>
        </div>
      </nav>
      
      <main className="container mx-auto px-6 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Revolutionize Your Call Center with AI
        </motion.h1>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Vontres AI brings cutting-edge artificial intelligence to your call center, 
          boosting efficiency and customer satisfaction.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/features" className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 mr-4">
            Explore Features
          </Link>
          <Link to="/pricing" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-500">
            View Pricing
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;