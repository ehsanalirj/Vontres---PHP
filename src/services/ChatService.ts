import { Server, Socket } from 'socket.io';
import { ChatMessage, ChatChannel } from '../models/Chat';
import User from '../models/User';

export class ChatService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.setupSocketHandlers();
  }

  private setupSocketHandlers() {
    this.io.on('connection', (socket: Socket) => {
      console.log('New client connected');

      socket.on('join_channel', (channelId: string) => this.joinChannel(socket, channelId));
      socket.on('leave_channel', (channelId: string) => this.leaveChannel(socket, channelId));
      socket.on('send_message', (data: { channelId: string, message: string }) => this.sendMessage(socket, data));
      socket.on('disconnect', () => console.log('Client disconnected'));
    });
  }

  private async joinChannel(socket: Socket, channelId: string) {
    const channel = await ChatChannel.findById(channelId);
    if (channel) {
      socket.join(channelId);
      console.log(`User joined channel: ${channelId}`);
    }
  }

  private async leaveChannel(socket: Socket, channelId: string) {
    socket.leave(channelId);
    console.log(`User left channel: ${channelId}`);
  }

  private async sendMessage(socket: Socket, data: { channelId: string, message: string }) {
    const user = await User.findById(socket.data.userId);
    if (user) {
      const message = new ChatMessage({
        channel: data.channelId,
        user: user._id,
        content: data.message,
      });
      await message.save();
      this.io.to(data.channelId).emit('new_message', {
        id: message._id,
        user: { id: user._id, name: user.name },
        content: message.content,
        timestamp: message.createdAt,
      });
    }
  }

  public async createChannel(name: string, companyId: string): Promise<ChatChannel> {
    const channel = new ChatChannel({ name, company: companyId });
    await channel.save();
    return channel;
  }

  public async getChannels(companyId: string): Promise<ChatChannel[]> {
    return ChatChannel.find({ company: companyId });
  }

  public async getChannelMessages(channelId: string, limit: number = 50): Promise<ChatMessage[]> {
    return ChatMessage.find({ channel: channelId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name');
  }
}