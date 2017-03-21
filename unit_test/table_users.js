/**
 * Created by jinliang on 3/20/17.
 */
var expect = require('expect.js');
// var pg = require('pg');
var sql_user = require('../db/sql_user');
var db = require("../db/db.js");
var config = require('../config/global.js');

var test_user = {
    id: 1,
    username: 'Eric',
    password:'123123',
    onlinestatus:1,
    accountstatus:1,
    privilege:1
}

suite('db_user', function () {
    test('Identify whether able to search a user in db', function (done) {
        db.all(sql_user.getUser(), [test_user.username], function (rows, err) {
            expect(err).to.not.be.ok();


            done();
        });
    });

    test('Identify whether able to insert a user', function (done) {
        db.run(sql_user.insertUser(), [test_user.username, test_user.password], function (row_id, err) {
            expect(err).to.not.be.ok();


            done();
        });
    });

    test('Identify whether able to validate a user`s username and password', function (done) {
        db.all(sql_user.validUsernameAndPassword(), [test_user.username, test_user.password], function (res, err) {
            expect(err).to.not.be.ok();


            done();
        });
    });


    test('Identify whether able to change a user`s status', function (done) {
        done();
    });
});
