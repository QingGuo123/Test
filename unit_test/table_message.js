/**
 * Created by jinliang on 3/21/17.
 */
var path = require('path');
var expect = require('expect.js');


var sql_message = require('../db/sql_message');
// var sql_status = require('../db/sql_status');


var db = null;
var initDB = require('../db/init_db.js');
var db_path = path.join(__dirname, '../db/table_message_test.db');
var config = require('../config/global.js');

db = initDB.initDB(db_path);
console.log(initDB);

var test_user2 = {
    userid: 1,
    username: 'Jinliang',
    content: 'Hollo everyone!',
    timestamp: '12:00',
    location: '129B',
    user_status: -1
};

suite('Messages DB', function () {

    test('- Identify whether able to insert a public message', function (done) {
        db.run(sql_message.insertMessage(),
            [test_user2.userid, test_user2.content, test_user2.timestamp, test_user2.location, test_user2.user_status],
            function (err) {
            expect(err).to.not.be.ok();
            done();
        });
    });

    test('- Identify whether able to get all public message', function (done) {
        db.each(sql_message.getAllPublicMessages(),function (err, rows) {
            expect(err).to.not.be.ok();
            console.log(rows);
            // expect(rows[0].)
            done();
        });
    });
});