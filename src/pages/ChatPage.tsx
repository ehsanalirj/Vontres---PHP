import React from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;