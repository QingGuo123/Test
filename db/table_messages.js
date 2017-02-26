'use strict';

module.exports = {

    createTable: function(db) {
        console.log('createTable: Messages');
        db.serialize(function() {
            db.run("CREATE TABLE MESSAGES (" +
                "ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "USERNAME CHAR(256) NOT NULL," +
                "MESSAGE TEXT," +
                "TIMESTAMP DATETIME" +
                ");");
        });
    },

    getAllPublicMessages: function(db) {
        console.log('getAllPublicMessages');
    }

};