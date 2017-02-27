// "use strict";
//
// var ModelOrigin = require("./ModelOrigin");
//
// var Message = function(username, message, timestamp) {
//     ModelOrigin.call(this);
//     this.username = username;
//     this.message = message;
//     this.timestamp = timestamp;
// };
//
// Message.prototype = Object.create(ModelOrigin.prototype);
//
// Message.getAllPublicMessages = function(callback) {
//     table_messages.getAllPublicMessages(this.db, callback);
// };
//
// Message.getPublicMessage = function(callback, username) {
//     table_messages.getAllPublicMessages(this.db, callback, {'username': username});
// };
//
// Message.postPublicMessage = function(callback, username, message, timestamp) {
//     table_messages.getAllPublicMessages(this.db, callback, {
//         'username': username,
//         'message': message
//     });
// };
//
// module.exports = Message;
