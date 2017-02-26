var sqlite3 = require('sqlite3').verbose();

module.exports = {
    initDB: function(db_path) {
        console.log("~/db/init_db.js: initialize database " + db_path);
        var db = new sqlite3.Database(db_path);
        var exists = fs.existsSync(db_path);

        db.users = require('../db/table_users.js');
        db.messages = require('../db/table_messages.js');

        if (!exists) {
            db.serialize(function() {
                db.users.createTable(db);
                db.messages.createTable(db);
            });
        }

        return db;
    }
}