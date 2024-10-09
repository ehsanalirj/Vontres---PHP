import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '$99',
    features: ['Up to 5 agents', 'Basic AI assistance', 'Standard analytics', 'Email support'],
    color: 'blue'
  },
  {
    name: 'Professional',
    price: '$299',
    features: ['Up to 20 agents', 'Advanced AI assistance', 'Comprehensive analytics', 'Priority support'],
    color: 'green'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited agents', 'Full AI suite', 'Custom analytics', 'Dedicated account manager'],
    color: 'purple'
  }
];

const PricingPlans: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-lg border-t-4 border-${plan.color}-500`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm text-gray-500">/month</span></p>
              <ul className="mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full bg-${plan.color}-500 text-white py-2 rounded-full hover:bg-${plan.color}-600 transition duration-200`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;