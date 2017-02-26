'use strict';

var Message = function(username, message, timestamp) {
    this.username = username;
    this.message = message;
    this.timestamp = timestamp;
};

Message.getAllPublicMessages = function(callback) {
    console.log('getAllPublicMessages');
};

Message.getPublicMessage = function(callback, username) {
    console.log('getPublicMessage ' + username);
};

Message.postPublicMessage = function(callback, username, message, timestamp) {
    console.log('postPublicMessage ' + username + ' ' + message + ' ' + timestamp);
};

module.exports = Message;
