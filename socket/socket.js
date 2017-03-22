"use strict";

var io = require('socket.io')();
var userSocket = require('./userSocket');
var messageSocket = require('./messageSocket');
var announcementSocket = require('./announcementSocket');
var statusSocket = require('./statusSocket');

var usocket = {};
usocket.length = 0;

io.on("connection", function(socket){
    userSocket(socket, io);
    messageSocket(socket, io, usocket);
    announcementSocket(socket, io);
    statusSocket(socket, io);

    socket.on("disconnect", function(){
        if (socket.username in usocket) {
            delete usocket[socket.username];
            usocket.length--;
        }
    });
});

exports.listen = function(server) {
    return io.listen(server);
};
