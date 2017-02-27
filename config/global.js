"use strict";

var path = require('path');

var db_config = {
    "ESN_db": {
        "driver": "sqlite3",
        "path": path.join(__dirname, '../db/ESN_db.db')
    }
};

module.exports = {
    "db_config": db_config
}