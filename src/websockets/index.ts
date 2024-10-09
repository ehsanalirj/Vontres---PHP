import { Server } from 'socket.io';

export const setupWebsockets = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_room', (room) => {
      socket.join(room);
    });

    socket.on('leave_room', (room) => {
      socket.leave(room);
    });

    socket.on('call_status', (data) => {
      io.to(data.room).emit('call_update', data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};