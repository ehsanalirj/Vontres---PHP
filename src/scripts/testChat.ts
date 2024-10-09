import io from 'socket.io-client';

async function testChat() {
  const socket = io('http://localhost:3000', {
    query: {
      token: 'agentToken', // Replace with an actual token
    },
  });

  socket.on('connect', () => {
    console.log('Connected to chat server');

    // Join a channel
    socket.emit('join_channel', 'sales');

    // Send a message
    socket.emit('send_message', {
      channel: 'sales',
      content: 'Hello, this is a test message',
    });

    // Listen for messages
    socket.on('new_message', (message) => {
      console.log('Received message:', message);
    });

    // Test private messaging
    socket.emit('send_private_message', {
      to: 'anotherAgentId',
      content: 'This is a private message',
    });

    socket.on('private_message', (message) => {
      console.log('Received private message:', message);
    });
  });

  // Disconnect after 10 seconds
  setTimeout(() => {
    socket.disconnect();
    console.log('Disconnected from chat server');
  }, 10000);
}

testChat();