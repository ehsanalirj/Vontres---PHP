import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../store/actions/chatActions';

interface NewChannelModalProps {
  onClose: () => void;
}

const NewChannelModal: React.FC<NewChannelModalProps> = ({ onClose }) => {
  const [channelName, setChannelName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (channelName.trim()) {
      dispatch(createChannel(channelName));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Create New Channel</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel name"
            className="w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChannelModal;