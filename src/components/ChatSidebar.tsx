import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquare, Users, Plus, Hash } from 'lucide-react';
import { fetchChannels, fetchDirectMessages } from '../store/actions/chatActions';
import ChannelList from './ChannelList';
import DirectMessageList from './DirectMessageList';
import NewChannelModal from './NewChannelModal';
import NewDirectMessageModal from './NewDirectMessageModal';

const ChatSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [showNewChannelModal, setShowNewChannelModal] = useState(false);
  const [showNewDMModal, setShowNewDMModal] = useState(false);
  const { channels, directMessages } = useSelector((state: RootState) => state.chat);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchDirectMessages(currentUser.id));
  }, [dispatch, currentUser]);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Company Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Channels
            </h3>
            <button
              onClick={() => setShowNewChannelModal(true)}
              className="text-gray-400 hover:text-white"
            >
              <Plus size={18} />
            </button>
          </div>
          <ChannelList channels={channels} />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold flex items-center">
              <Users size={18} className="mr-2" />
              Direct Messages
            </h3>
            <button
              onClick={() => setShowNewDMModal(true)}
              className="text-gray-400 hover:text-white"
            >
              <Plus size={18} />
            </button>
          </div>
          <DirectMessageList directMessages={directMessages} />
        </div>
      </div>
      {showNewChannelModal && (
        <NewChannelModal onClose={() => setShowNewChannelModal(false)} />
      )}
      {showNewDMModal && (
        <NewDirectMessageModal onClose={() => setShowNewDMModal(false)} />
      )}
    </div>
  );
};

export default ChatSidebar;