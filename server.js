const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/client/build'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

io.on('connection', (client) => {
  console.log('a user connected');
  client.on('only me',user=>{
    client.emit('count')
  })
  client.on('broadcast except me',user=>{
    client.broadcast.emit('count')
  })
  client.on('broadcast to everyone',user=>{
    io.emit('count')
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
