"use strict";
var md5 = require('crypto-js/md5');

module.exports = {
    createTable: function (db) {
        console.log("~/db/table_users: create USERS table.");
        var adminpwd = md5("admin");
        db.serialize(function () {
            db.run("CREATE TABLE USERS (" +
                "ID INTEGER PRIMARY KEY AUTOINCREMENT," +
                "NAME CHAR(256) NOT NULL," +
                "PASSWORD CHAR(256) NOT NULL," +
                "ACCOUNTSTATUS CHAR(256) NOT NULL," +
                "PRIVILEGELEVEL CHAR(256) NOT NULL" +
                ")");
            db.run("INSERT INTO USERS (NAME, PASSWORD, ACCOUNTSTATUS, PRIVILEGELEVEL) VALUES ('SSNAdmin','" + adminpwd + "','Active','Administrator')");
        });
    },
}