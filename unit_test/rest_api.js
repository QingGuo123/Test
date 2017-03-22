/**
 * Created by jinliang on 3/21/17.
 */
var assert = require('assert');
var request = require('supertest');
var app = null;
var path = require('path');
var expect = require('expect.js');


before(function () {
    var config = require('../config/global');
    var db_path = path.join(__dirname, '../db/ESN_db.db');
    var initDB = require('../db/init_db.js');

    app = require('../app.js');
});


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


describe('Restful API test', function () {
    it('- should register a user if user does not exist', function (done) {
        var req = request(app).post('/users');
        req
            .send({username: user1.username, password: user1.password})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res).to.have.property('body');
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('- should login a user if user exists', function (done) {
        var req = request(app).post('/users');
        req
            .send({username: user1.username, password: user1.password})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('- should validate the test user exists', function (done) {
        var req = request(app).get('/users/' + user1.username);
        req.expect(200, done);
    });

    it('should validate a non-exist user does not exist', function (done) {
        var req = request(app).get('/users/' + 'Jinliang123');
        req
            .end(function (err,res) {
                // expect(err).to.be.ok();// not sure
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(404);
                done();
            });;
    });


    it("- should update the test user's status", function (done) {
        var req = request(app).post('/status');
        req
            .send({username: user1.username, status_code: -1, timestamp:user1.timestamp, location:user1.location})
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });

    it("- should return 404 when update a non-exist user's status", function (done) {
        var req = request(app).post('/status');
        req
            .send({username: "Jinliang", status_code: -1, timestamp: '13:00', location: 'Mountain View'})
            .expect(404, done);
    });

    it("- should post announcement", function (done) {
        var req = request(app).post('/messages/announcements');
        req
            .send({username: user2.username, content: user2.content, timestamp: user2.timestamp, location: user2.location})
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });

});