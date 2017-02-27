"use strict";

var ModelOrigin = require("./ModelOrigin");
var table_users = require("../db/table_users");

var User = function(username, password) {
    ModelOrigin.call(this);
    this.username = username;
    this.password = password;
};

User.prototype = Object.create(ModelOrigin.prototype);

User.getAllUsers = function(callback) {
    table_users.getAllUsers(this.db, callback);
};

User.getUser = function(callback, name) {
    table_users.getUser(this.db, callback, {"NAME": name});
};

User.addNewUser = function (callback) {
    table_users.insertUser(this.db, callback, {
        "NAME": this.username,
        "PASSWORD": this.password
    });
};

User.setUserOnline = function(callback) {
    var data = {
        "NAME": this.username,
        "PASSWORD": this.password
    };
    table_users.setUserOnline(this.db, callback, data);
};


module.exports = User;