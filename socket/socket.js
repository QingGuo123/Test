var io = require('socket.io')();
var userSocket = require('./userSocket');
var messageSocket = require('./messageSocket');

io.on("connection", function(socket){
    userSocket(socket, io);
    messageSocket(socket, io);
});

exports.listen = function(server) {
    return io.listen(server);
};