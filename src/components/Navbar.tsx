import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface NavbarProps {
  user: any;
  setUser: (user: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AI Cold Calling Copilot</Link>
        {user && (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="flex items-center">
              <LogOut size={20} className="mr-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;