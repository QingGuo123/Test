"use strict";

module.exports = {
    createTable: function(db) {
        console.log("~/db/table messages: creating messages table....");
        db.serialize(function() {
            db.run("CREATE TABLE messages("+
                "ID INTEGER PRIMARY KEY AUTOINCREMENT,"+
                "USERNAME CHAR(256) NOT NULL,"+
                "MESSAGE TEXT,"+
                "Timestamp DATETIME"+
                ")");
        });
    }
}