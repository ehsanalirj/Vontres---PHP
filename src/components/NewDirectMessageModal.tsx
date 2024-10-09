import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, startDirectMessage } from '../store/actions/chatActions';

interface NewDirectMessageModalProps {
  onClose: () => void;
}

const NewDirectMessageModal: React.FC<NewDirectMessageModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.chat.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (userId: string) => {
    dispatch(startDirectMessage(userId));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">New Direct Message</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="w-full p-2 border rounded mb-4"
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredUsers.map(user => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              {user.username}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDirectMessageModal;