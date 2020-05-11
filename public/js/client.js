'use strict';

// initialize websocket connection
const url = 'ws://localhost:8081';
const connection = new WebSocket(url);

// define callback functions for each event

// will be triggert, when connection is established
connection.onopen = () => {
  console.info('ws onopen');
  connection.send(JSON.stringify({ clientArray : ['hello', 'from', 'client']}));
};

// will be triggert, when an error occurred
connection.onerror = (error) => {
  console.error('ws onerror', error);
};

// will be triggert, when a new message is send from 'server'
connection.onmessage = (message) => {
  console.log('new message from server', message);
  const msg = JSON.parse(message.data);
  console.log(msg);
};

// will be triggert, when connection is closed
connection.onclose = (close) => {
  console.log('ws onclose', close);
}