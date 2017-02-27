var path = require('path');

var development_config = {
    "db": {
        "driver": "sqlite3",
        "path": path.join(__dirname, '../db/ESN_db.db')
    }
};

module.exports = {
    "dev": development_config
}