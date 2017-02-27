"use strict";

module.exports = {

    /**
     * fields declaration:
     * id: primary key
     * userid: user's id in table 'User'
     * content: the content of a message
     * timestamp: the time at which the message is posted
     */
    createTable: function() {
        var sql = "CREATE TABLE Message (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "userid INTEGER NOT NULL," +
            "content TEXT," +
            "timestamp CHAR(256) NOT NULL," +
            "FOREIGN KEY (userid) REFERENCES User(id)" +
            ");";
        return sql;
    },

    getAllPublicMessages: function () {
        var sql = "SELECT * FROM Message ORDER BY timestamp;";
        return sql;
    },

    insertMessage: function() {
        var sql = "INSERT INTO Message (userid, content, timestamp) VALUES ((SELECT id FROM User WHERE username = ?), ?, ?)";
        return sql;
    },

    getPublicMessage: function () {
        var sql = "SELECT username, content, timestamp FROM Message, User WHERE username = ? AND User.id = Message.userid ORDER BY timestamp;";
        return sql;
    }

};
