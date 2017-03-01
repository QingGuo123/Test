var io = require('socket.io')();

module.exports = function(socket) {
    console.log("invoke messageSocket");
    socket.on("message", function(obj){
        socket.emit("message1", {
            "username": obj.username,
            "content": obj.content,
            "timestamp": obj.timestamp
        });
        console.log('finished emit');
    });
};