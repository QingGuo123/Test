/**
 * Created by jinliang on 3/20/17.
 */
var path = require('path');
var expect = require('expect.js');


var sql_user = require('../db/sql_user');
var sql_status = require('../db/sql_status');


var db = null;
var initDB = require('../db/init_db.js');
var db_path = path.join(__dirname, '../db/ESN_db.db');
var config = require('../config/global.js');


db = initDB.initDB(db_path);
console.log(initDB);

var test_user = {
    username: 'Guo Qing',
    password:'123123123',
    onlinestatus:0,
    accountstatus:0,
    privilege:0
};

var test_admin_user = {
    username: 'Jianfeng',
    password:'123123123',
    onlinestatus:1,
    accountstatus:0,
    privilege:0
};

suite('Users DB', function () {

    test('Identify whether able to insert a test_user', function (done) {
        db.run(sql_user.insertUser(), [test_user.username, test_user.password], function (err,row) {
            expect(err).to.not.be.ok();
            console.log(row);
            done();
        });
    });

    test('Identify whether able to get the test_user in db', function (done) {
        db.all(sql_user.getUser(), [test_user.username], function (err, row) {
            expect(err).to.not.be.ok();
            console.log(row);
            expect(row[0].username).to.equal(test_user.username);
            done();
        });
    });


    test('Identify whether able to validate a user`s username and password', function (done) {
        db.all(sql_user.validUsernameAndPassword(), [test_user.username, test_user.password], function (err, row) {
            expect(err).to.not.be.ok();
            expect(row.length).to.equal(1);
            done();
        });
    });


    test('Identify whether able to set a user`s status', function (done) {
        db.run(sql_status.insertStatus(), [test_user.username, -1,'', ''], function (err, res, row) {
            expect(err).to.not.be.ok();
            done();
        });
    });

    test('Identify whether able to insert a admin user', function (done) {
        done();
    })
});
