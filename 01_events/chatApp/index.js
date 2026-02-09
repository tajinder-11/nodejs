const ChatRoom = require('./chatRoom.js');

const chat = new ChatRoom();

chat.on('join', (user) => {
  console.log(`${user} has joined the chat`);
});

chat.on('message', (user, message) => {
  console.log(`${user}: ${message}`);
});

chat.on('leave', (user) => {
  console.log(`${user} has left the chat`);
});

//simulating the chat

chat.join('John');
chat.join('Doe');
chat.join('Alex');

chat.sendMessage('Alex', 'Hey i am a hero');
chat.sendMessage('John', 'Hey i am a bigger hero than you');

chat.leave('Alex');
chat.sendMessage('Alex', ' hey i am alex sending the message');
chat.leave('Doe');
