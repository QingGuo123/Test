var io = require('socket.io')();

io.on("connection", function(socket){

});

exports.listen = function(server) {
    return io.listen(server);
}