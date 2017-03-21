module.exports = function(socket, io, usocket) {
    console.log("invoke messageSocket");
    socket.on("message", function(obj){
        io.sockets.emit("message", {
            "username": obj.username,
            "content": obj.content,
            "timestamp": obj.timestamp
        });
    });

    socket.on("startChatPrivately", function(obj){
        if (obj.username in usocket) {}
        else {
            socket.username = obj.username;
            usocket[obj.username] = socket;
            usocket.length++;
            console.log("length = " + usocket.length);
        }
    });

    socket.on("privateMessage", function(obj){
        if (obj.to in usocket) {
            usocket[obj.to].emit("ev_to" + obj.to, {"message": obj.message});
        }
    });
};
