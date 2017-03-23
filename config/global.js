"use strict";

var path = require('path');

var db_config = {
    "ESN_db": {
        "driver": "sqlite3",
        "path": path.join(__dirname, '../db/ESN_db.db')
    }
};

var console_log_config = {
    "controller_log": false,
    "model_log": false,
    "response_log": false,
    "session_log": false
};

var test_config = {
    "check_session": true,
    "delete_db_when_run": true
};

module.exports = {
    "db_config": db_config,
    "console_log_config": console_log_config,
    "test_config": test_config
}
