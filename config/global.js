var path = require('path');

var development_config = {
    "db": {
        "driver": "sqlite3",
        "path": path.join(__dirname, '../db/ssnoc-dev.db')
    }
};

module.exports = {
    "dev": development_config
}