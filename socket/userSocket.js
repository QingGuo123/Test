var io = require('socket.io')();

io.on("connection", function(socket){
    socket.on("message", function(){
        console.log("got message");
        io.emit("message", {
            "result": 0
        });
    });
});

exports.listen = function(server) {
    return io.listen(server);
};