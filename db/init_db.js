"use strict";

var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var config = require('../config/global.js');

var sql_user = require('../db/sql_user');
var sql_message = require('../db/sql_message');
var sql_announcement = require('../db/sql_announcement');
var sql_status = require('../db/sql_status');
var sql_privateMessage = require('../db/sql_privateMessage');

var delete_db_when_run = config.test_config.delete_db_when_run;

module.exports = {

    initDB: function(db_path) {
        console.log("initialize database " + db_path);
        var db = new sqlite3.Database(db_path);
        var exists = fs.existsSync(db_path);
        if (exists && delete_db_when_run) {
            fs.unlinkSync(db_path);
            console.log("delete database succeed");
            db = new sqlite3.Database(db_path);
            db = createDBAndTables(db);
            return db;
        }
        else {
            db = createDBAndTables(db);
            return db;
        }
    }

};

function createDBAndTables(db) {
    db.serialize(function() {
        db.run(sql_user.createTable());
        //db.run(sql_user.insertAdminUser("adminpwd"));
        db.run(sql_message.createTable());
        db.run(sql_announcement.createTable());
        db.run(sql_status.createTable());
        db.run(sql_privateMessage.createTable());
    });
    console.log("create database & tables succeed");
    return db;
}
