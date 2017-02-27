"use strict";

var db = require("../db/db.js");
var sql_users = require("../db/sql_users");
var AppErrors = require("../AppErrors");

var User = function(username, password) {
    this.username = username;
    this.password = password;

    this.regOrLogin = function(callback) {
        var username = this.username;
        var password = this.password;
        console.log('~/models/user: regOrLogin ' + username + ' ' + password);
        db.serialize(function () {
            db.all(sql_users.getUser(), [username],
                function (error, rows) {
                    if (error) {
                        callback(null, error);
                    } else if (rows.length == 0) {
                        db.run(sql_users.insertUser(), [username, password],
                            function (error) {
                                if (error) {
                                    callback(null, error);
                                } else {
                                    callback({"regOrLoginResult": 0}, null);
                                }
                            }
                        );
                    } else if (rows.length == 1){
                        db.all(sql_users.validUsernameAndPassword(), [username, password],
                            function (error, rows) {
                                if (error)
                                    callback(null, error);
                                else if (rows.length == 0) {
                                    callback({"regOrLoginResult": 1}, null);
                                }
                                else if (rows.length == 1) {
                                    callback({"regOrLoginResult": 2}, null);
                                }
                            }
                        );
                    
                    } else if (rows.length > 1) {
                        callback(null, new AppErrors.RepeatedUsername("This username has over than 1 query results."));
                    }
                }
            );
        });
        
        
    };

};

User.getAllUsers = function(callback) {
    console.log('~/models/user: getAllusers');
    var users = [];
    db.each(sql_users.getAllUsers(),
        function (error, row) {
            if (error) {
                callback(null, error);
            } else if (row) {
                users.push(row);
            }
        }, function () {
            callback(users, null);
        }
    );
};

User.getUser = function(callback, userdata) {
    var username = userdata["username"];
    console.log('~/models/user: getUser ' + username);
    db.all(sql_users.getUser(), [username],
        function (error, rows) {
            if (error) {
                callback(null, error);
            } else if (rows.length == 0) {
                callback(null, new AppErrors.UserNotExisted("User not existed."));
            } else if (rows.length == 1){
                callback(rows[0], null);
            } else if (rows.length > 1) {
                callback(null, new AppErrors.RepeatedUsername("This username has over than 1 query results."));
            }
        }
    );
};

module.exports = User;
