"use strict";

var ModelOrigin = require("./ModelOrigin");

var User = function(username, password) {
    ModelOrigin.call(this);
    this.username = username;
    this.password = password;
};

// Copy static variables and functions
for (var i in BaseModel) {
    // Avoid copy undefined aka "prototoype"
    if (i !== undefined) {
        User[i] = BaseModel[i];
    }
}
// Copy instance functions
User.prototype = Object.create(BaseModel.prototype);

User.getAllUsers = function(handler) {
    this.db.users.getUsers(this.db, handler);
};

User.getUser = function(handler, id) {
    this.db.users.getUser(this.db, handler, {"ID": id});
};