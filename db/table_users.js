"use strict";
//var md5 = require('crypto-js/md5');

module.exports = {
    
    createTable: function (db) {
        /**
         * fields declaration:
         * name: user's nickname when login to system. This field should be unique.
         * password: md5 string corresponding to user's password, since plain text is not secure
         * accountStatus: this field record the account status, user can cancel his or her account but can also re
         *      reactivate it, so it is not wise to delete rows when user cancel account
         * privilege: every account has a unique privilege and can do different level of things
         * status: user's status record whether use is online or offline, more status such as busy, away can also be added
         * status: 0 offline, 1 online
         * privilege: 0 admin, 1 sub-admin, 2 normal citizen
         * statues: 0 inactive, 1 active
         */
        console.log("~/db/table_users: create USERS table.");
        var adminpwd = 'admin';
        db.serialize(function () {
            db.run("CREATE TABLE USERS (" +
                "ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "NAME CHAR(256) NOT NULL," +
                "PASSWORD CHAR(256) NOT NULL," +
                "ACCOUNTSTATUS INTEGER NOT NULL," +
                "PRIVILEGE INTEGER NOT NULL," +
                "STATUS INTEGER NOT NULL" +
                ");");
            db.run("INSERT INTO USERS (NAME, PASSWORD, ACCOUNTSTATUS, PRIVILEGE, STATUS) VALUES ('admin','" + adminpwd + "',1 , 0, 0)");
        });
    },

    getAllUsers: function (db, callback) {
        var query = "SELECT ID, NAME, PRIVILEGE, STATUS, FROM USERS ORDER BY NAME";
        // array to store all results
        var users = [];
        console.log(db);
        db.each(query,
            function (error, row) {
                if (error) {
                    callback(null, error);
                } else if (row) {
                    users.push(row);
                } else {
                    callback(null, new Error("Unknown errors."));
                }
            }, function () {
                callback(users, null);
                console.log(users);
            }
        );
    },

    /**
     * check whether a certain user exiest
     * @param db
     * @param callback
     * @param data
     */
    getUser: function (db, callback, data) {
        var query = "SELECT NAME, PRIVILEGE FROM USERS WHERE NAME = ?";
        var name = data["NAME"];
        db.all(query, name, function (error, rows) {
            if (error) {
                callback(null, error);
            } else if (rows.length == 0) {
                callback(null, new Error("User does not exist"));
            } else if (rows.length == 1){
                callback(rows[0], null);
            } else if (rows.length > 1) {
                callback(null, new Error("Internal error occur, dual users. Check code!"));
            } else {
                // to nothing, leave for extension
            }
        });
    },

    insertUser: function (db, callback, data) {
        /**
         * we need to check whether this user has been existed
         */
        var name = data["NAME"];
        var password = data["PASSWORD"].toString();

        db.serialize(function () {
            db.all("SELECT * FROM USERS WHERE NAME= ? ", name,
                function (error, rows) {
                    if (error) {
                        callback(null, error);
                    } else if (rows.length != 0) {
                        callback(null, new Error("Username exists! Choose another one."));
                    }
                });
            var query = "INSERT INTO USERS(NAME, PASSWORD, PRIVILEGE, STATUS) VALUES(?, ?, 2, 1)"
            db.run(query, [name, password],
                function (error) {
                    if (error) {
                        callback(null, error);
                    } else {
                        callback("Success insert user!"/*this.lastID*/, null);
                    }
                });
        });
    },

    setUserOnline:function (db, callback, data) {
        var name = data["NAME"];
        var query = "UPDATE USERS SET STATUS = 1 WHERE NAME = ?";

        db.run(query, name, function (error, rst) {
            if (error) {
                callback(null, error);
            } else {
                callback("Success update status to online!", null);
            }
        });
    },

    setUserOffline: function (db, callback, data) {
        var name = data["NAME"];
        var query = "UPDATE USERS SET STATUS = 0 WHERE NAME = ?";

        db.run(query, name, function (error, rst) {
            if (error) {
                callback(false, error);
            } else {
                callback("Success update status to offline!", null);
            }
        });
    }
};