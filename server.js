'use strict';
const WebSocket = require('ws');
const express = require('express');
const util = require('util'); // just needed for console.log

const HTTP_PORT = 8080;
const WSS_PORT = 8081;

// setup Express that will send simple static content
const app = express();
app.use(express.static(__dirname + '/public'));

// initialize WebSocket
const wss = new WebSocket.Server({ port: WSS_PORT });

wss.on('connection', (ws) => {
  // Message Event-Listener
  ws.on('message', (message) => {
    // Message Event-Object -> 'ws'-Package just return us the 'data', not a full message object like the Browser-Implementation!
    console.log(`received message: '${message}'`);
    // De-serialize received message;
    const msg = JSON.parse(message);
    console.log(util.inspect(msg, {showHidden: false, depth: null}));
  });

  // Serialized JSON object will be send to client
  ws.send(JSON.stringify({ serverArray : ['hello', 'from', 'server']}));
});

// Start HTTP-Server
app.listen(HTTP_PORT, () => {
  console.log(`express running on http://localhost:${HTTP_PORT}`);
});