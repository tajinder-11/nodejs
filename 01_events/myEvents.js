const EventEmitter = require('events'); // Importing the events module

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (username) => {
  console.log('hello and welcome to events in node js', username);
});

eventEmitter.on('greet', (username) => {
  console.log(username, 'hello and welcome to events in node js');
});

eventEmitter.once('pushNotify', () => {
  console.log('This event will run only once');
});

// Emit the event
eventEmitter.emit('greet', 'Tajinder');
// eventEmitter.emit('greet', 'singh');
// eventEmitter.emit('pushNotify');
// eventEmitter.emit('pushNotify');
// eventEmitter.emit('greet', 'singh');

const myListener = () => {
  console.log('I am a test listener');
};
// eventEmitter.on('test', myListener);
// eventEmitter.emit('test');
// eventEmitter.removeListener('test', myListener);
// eventEmitter.emit('test');

console.log(eventEmitter.listeners('greet'));
