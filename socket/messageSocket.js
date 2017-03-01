module.exports = function(socket, io) {
    console.log("invoke messageSocket");
    socket.on("message", function(obj){
        io.sockets.emit("message", {
            "username": obj.username,
            "content": obj.content,
            "timestamp": obj.timestamp
        });
    });
};