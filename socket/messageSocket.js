var io = require('socket.io')();

io.on("connection", function(socket){
    console.log('socket on');
    socket.on("public_message", function(obj){
        console.log('socket: public_message');
        io.emit("test", {result: 0});
    });

    socket.on("test", function(obj){
        console.log('socket: test ' + obj.result);
    });

});

exports.listen = function(server) {
    return io.listen(server);
};