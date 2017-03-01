var io = require('socket.io')();

module.exports = function(socket) {
    console.log("invoke userSocket");
    socket.on("123", function(obj){

    });
}