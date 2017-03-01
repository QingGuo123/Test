var io = require('socket.io')();
var userSocket = require('./userSocket');
var messageSocket = require('./messageSocket');

io.on("connection", function(socket){
    console.log('socket on');
    userSocket(socket);
    messageSocket(socket);
});

exports.listen = function(server) {
    return io.listen(server);
};