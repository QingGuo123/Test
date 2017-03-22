/**
 * Created by jinliang on 3/22/17.
 */
var expect = require('expect.js');

var User = require('../models/user.js');
var Status = require('../models/status.js');

var user1 = {
    username: 'Eric2',
    password:'123123123',
    content: 'Hello World!',
    status_code:0,
    timestamp:'24:00',
    location:'129B'
};

var user2 = {
    username: 'Minghao2',
    password:'123123123',
    content: 'Bye World!',
    status_code:1,
    timestamp: '00:00',
    location: '129A'
};

var user3 = {
    username: 'Jianfeng',
    password:'123123123',
    content: 'Hello World again!',
    status_code:1,
    timestamp: '12:00',
    location: '230'
};

suite('Test status conponent', function () {

    test(' - Identify a exist user can insert or update status', function (done) {
        var test_status = new Status(user1.username, user1.status_code, user1.timestamp, user1.location);
        test_status.postStatus(function (res, err) {
            expect(err).to.equal(null);
            expect(res.postStatusResult).to.equal(0);
            done();
        });
    });

    test(' - Identify a non-exist user cannot insert or update status', function (done) {
        var test_status = new Status(user2.username, user2.status_code, user2.timestamp, user2.location);
        test_status.postStatus(function (res, err) {
            expect(res).to.equal(null);
            expect(err.message).to.equal('User not existed.');
            done();
        });
    });

    test(' - Identify  can get a exist user`s status', function (done) {
        Status.getStatus(function (status, err) {
            expect(err).to.equal(null);
            expect(status.username).to.equal(user1.username);
            expect(status.status_code).to.equal(user1.status_code);
            done();
        }, {'username': user1.username});
    });


    test(' - Identify cannot get a non-exist user`s status', function (done) {
        Status.getStatus(function (status, err) {
            expect(err.message).to.equal('User not existed.');
            expect(status).to.equal(null);
            done();
        }, {'username': user2.username});
    });

});