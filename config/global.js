"use strict";

var path = require('path');

var db_config = {
    "ESN_db": {
        "driver": "sqlite3",
        "path": path.join(__dirname, '../db/ESN_db.db')
    }
};

var console_log_config = {
    "controller_log": true,
    "model_log": true,
    "response_log": false,
    "session_log": false
};

module.exports = {
    "db_config": db_config,
    "console_log_config": console_log_config
}