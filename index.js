const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;
users = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('setUsername', function(data){
    if(users.indexOf(data) > -1){
       users.push(data);
       socket.emit('userSet', {username: data});
    } else {
       socket.emit('userExists', data + ' username is taken! Try some other username.');
   }
 })

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });


    socket.on('create', function(room) {
        socket.join(room);
        console.log(room);
    });

});

httpServer.listen(port, () => console.log(`listening on port ${port}`));