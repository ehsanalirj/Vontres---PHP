import io from 'socket.io-client';
import { store } from '../store/store';

const socket = io('https://api.vontres.ai', {
  autoConnect: false,
});

export const connectSocket = () => {
  const token = store.getState().auth.token;
  if (token) {
    socket.io.opts.query = { token };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const subscribeToCallUpdates = (callback: (data: any) => void) => {
  socket.on('call_update', callback);
};

export const unsubscribeFromCallUpdates = () => {
  socket.off('call_update');
};

export default socket;