import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

interface DirectMessage {
  id: string;
  username: string;
  online: boolean;
}

interface DirectMessageListProps {
  directMessages: DirectMessage[];
}

const DirectMessageList: React.FC<DirectMessageListProps> = ({ directMessages }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(`/chat/dm/${userId}`);
  };

  return (
    <ul className="space-y-1">
      {directMessages.map((user) => (
        <li
          key={user.id}
          onClick={() => handleUserClick(user.id)}
          className="flex items-center cursor-pointer hover:bg-gray-700 rounded px-2 py-1"
        >
          <User size={18} className="mr-2 text-gray-400" />
          <span>{user.username}</span>
          <span className={`ml-auto w-2 h-2 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-500'}`}></span>
        </li>
      ))}
    </ul>
  );
};

export default DirectMessageList;