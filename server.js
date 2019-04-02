
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);

console.log("Your server is running...");

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/public/views/game.html');
});

io.sockets.on('connection', function(socket){

  connections.push(socket);
  console.log('New Connection: '+socket.id);

  //New user
  socket.on('new user', function(data){
    console.log('User %s: '+data.nome, connections.length);
    users.push(data);
  });
  
});
