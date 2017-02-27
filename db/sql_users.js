"use strict";

module.exports = {

    /**
     * fields declaration:
     * name: user's nickname when login to system. This field should be unique.
     * password: md5 string corresponding to user's password, since plain text is not secure
     * accountStatus: this field record the account status, user can cancel his or her account but can also re
     *      reactivate it, so it is not wise to delete rows when user cancel account
     * privilege: every account has a unique privilege and can do different level of things
     * status: user's status record whether use is online or offline, more status such as busy, away can also be added
     * onlinestatus: 0 offline, 1 online
     * privilege: 0 admin, 1 sub-admin, 2 normal citizen
     * accountstatus: 0 inactive, 1 active
     */
    createTable: function() {
        var sql = "CREATE TABLE Users (" +
            "UsersID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "username CHAR(256) NOT NULL UNIQUE," +
            "password CHAR(256) NOT NULL," +
            "onlinestatus INTEGER NOT NULL," +
            "accountstatus INTEGER NOT NULL," +
            "privilege INTEGER NOT NULL" +
            ");";
        return sql;
    },

    getAllUsers: function () {
        var sql = "SELECT * FROM Users ORDER BY username;";
        return sql;
    },

    insertAdminUser: function(adminpwd) {
        var sql = "INSERT INTO Users (username, password, onlinestatus, accountstatus, privilege) VALUES ('admin','" + adminpwd + "', 1, 0, 0)";
        return sql;
    },

    getUser: function () {
        var sql = "SELECT * FROM Users WHERE username = ?;";
        return sql;
    },

    insertUser: function () {
        var sql = "INSERT INTO Users (username, password, onlinestatus, accountstatus, privilege) VALUES (?, ?, 1, 0, 0)";
        return sql;
    },

    validUsernameAndPassword: function () {
        var sql = "SELECT * FROM Users WHERE username = ? AND password = ?;";
        return sql;
    }
};
