import React from 'react';
import { Link } from 'react-router-dom';
import { Users, PhoneCall, BarChart2, Settings, MessageSquare } from 'lucide-react';

const CompanyDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Company Dashboard</h2>
        </div>
        <ul className="mt-4">
          <li>
            <Link to="/company/agents" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
              <Users className="mr-3" />
              Manage Agents
            </Link>
          </li>
          <li>
            <Link to="/company/calls" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
              <PhoneCall className="mr-3" />
              Call Analytics
            </Link>
          </li>
          <li>
            <Link to="/company/reports" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
              <BarChart2 className="mr-3" />
              Reports
            </Link>
          </li>
          <li>
            <Link to="/company/chat" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
              <MessageSquare className="mr-3" />
              Team Chat
            </Link>
          </li>
          <li>
            <Link to="/company/settings" className="flex items-center p-4 text-gray-700 hover:bg-gray-200">
              <Settings className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8">
        {/* Main content area */}
      </main>
    </div>
  );
};

export default CompanyDashboard;