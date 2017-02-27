var config = require('../config/global.js');
var db_path = config.dev.db.path;

var init_db = require('./init_db');

// This module only serves as a interface to init_db adapter
module.exports = init_db.initDB(db_path);