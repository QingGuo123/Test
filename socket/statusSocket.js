module.exports = function(socket, io) {
    console.log("invoke statusSocket");
    socket.on("status", function(obj){
        io.sockets.emit("updateDirectory");
    });
};
