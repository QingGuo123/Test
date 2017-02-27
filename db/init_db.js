"use strict";

var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();

var sql_users = require('../db/sql_users');

module.exports = {

    initDB: function(db_path) {
        console.log("initialize database " + db_path);
        var db = new sqlite3.Database(db_path);
        var exists = fs.existsSync(db_path);
        
        if (!exists) {
            db.serialize(function() {
                db.run(sql_users.createTable());
                db.run(sql_users.insertAdminUser("adminpwd"));
            });
            console.log("create tables succeed");
        }

        return db;
    }

}
