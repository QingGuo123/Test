"use strict";

var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();

var sql_user = require('../db/sql_user');
var sql_message = require('../db/sql_message');
var sql_announcement = require('../db/sql_announcement');

module.exports = {

    initDB: function(db_path) {
        console.log("initialize database " + db_path);
        var db = new sqlite3.Database(db_path);
        var exists = fs.existsSync(db_path);
        
        if (!exists) {
            db.serialize(function() {
                db.run(sql_user.createTable());
                db.run(sql_user.insertAdminUser("adminpwd"));
                db.run(sql_message.createTable());
                db.run(sql_announcement.createTable());
            });
            console.log("create tables succeed");
        }

        return db;
    }

}
