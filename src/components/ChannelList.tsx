import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
}

interface ChannelListProps {
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const navigate = useNavigate();

  const handleChannelClick = (channelId: string) => {
    navigate(`/chat/channel/${channelId}`);
  };

  return (
    <ul className="space-y-1">
      {channels.map((channel) => (
        <li
          key={channel.id}
          onClick={() => handleChannelClick(channel.id)}
          className="flex items-center cursor-pointer hover:bg-gray-700 rounded px-2 py-1"
        >
          <Hash size={18} className="mr-2 text-gray-400" />
          {channel.name}
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;