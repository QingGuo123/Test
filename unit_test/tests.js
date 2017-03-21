/**
 * Created by jinliang on 3/19/17.
 */
var expect = require('expect.js');
var agent = require('superagent');

var PORT = process.env.PORT | 3000;
var HOST = 'http://localhost:' + PORT;

//Init a server
var debug = require('debug')('ESN');
var app = require('../app.js');

app.set('port', PORT);
app.set('testing', true);

var serverInit = function () {
    debug('Express server listening on port' + PORT);
};

var server = app.listen(app.get('port'), serverInit)
    .on('error', function(err){
        if(err.code === 'EADDRINUSE'){
            PORT++;
            HOST = 'http://localhost:'+PORT;
            app.set('port', PORT);
            server = app.listen(app.get('port'), serverInit)
        }
    });

var user1 = {
    id: 1,
    username: 'Eric2',
    password:'123123123',
    content: 'Hello World!',
    status_code:0,
    timestamp:'24:00',
    location:'129B'
};

var user2 = {
    id: 2,
    username: 'Minghao2',
    password:'123123123',
    content: 'Bye World!',
    status_code:1,
    timestamp: '00:00',
    location: '129A'
};

suite('users API', function () {


    test('Should register a user if username not exists', function (done) {
        var req = agent.post(HOST + '/users');
            req
                .send({username: user1.username, password:user1.password})
                .end(function (err,res) {
                    expect(err).to.not.be.ok();
                    expect(res).to.have.property('statusCode');
                    expect(res).to.have.property('body');
                    expect(res.statusCode).to.equal(201);
                    session = res.body.
                    done();
            });
    });

    test('Should login a user if the username exists', function (done) {
        var req = agent.post(HOST + '/users');
        req
            .send({username: user1.username, password:user1.password})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                //expect(res).to.have.property('body');
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    test('Should not login a user if the username not exist', function (done) {
        var req = agent.post(HOST + '/users');
        req
            .send({username:user2.username, password: user2.password})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                //expect(res).to.have.property('body');
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    test('Validate the user if exists', function (done) {
        var req = agent.get(HOST + '/users/' + user1.username);
        req
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res).to.have.property('body');
                expect(res.statusCode).to.equal(200);
                done();
            });
    });


    // test('Validate the user format', function (done) {
    //     var req = agent.get(HOST + '/users/' + user1.username);
    //     req
    //         .end(function (err, res) {
    //             expect(err).to.not.be.ok();
    //             expect(res).to.have.property('body');
    //             expect(res.body).to.have.property('username');
    //             expect(res.body).to.have.property('password');
    //             expect(res.body).to.have.property('onlinestatus');
    //             expect(res.body).to.have.property('accountstatus');
    //             expect(res.body).to.have.property('privilege');
    //             done();
    //         });
    // });

    test('Validate user data', function (done) {
        var req = agent.get(HOST + '/users/' + user1.username);
        req
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('body');
                expect(res.body).to.eql(user1);
                done();
            });
    });


    test('Validate a non-exist user if not exist', function (done) {
        var req = agent.get(HOST + '/users/' + user2.username);
        req
            .end(function (err,res) {
                expect(err).to.not.be.ok();// not sure
                expect(res).to.have.property('statusCode');
                expect(res).to.have.property('body');
                expect(res.statusCode).to.equal(404);
                done();
            });
    });



    test('Should update the test user`s status', function (done) {
        var req = agent.post(HOST + '/status');
        req
            .send({username: user1.username, status_code: 0, timestamp:user1.timestamp, location:user1.location})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(200);
                expect(res.body.postStatusResult).to.eql(0);
                done();
            });
    });

    test('Should retrieve the test user`s status', function (done) {
        var req = agent.get(HOST + '/status/' + user1.username);
        req
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(200);
                expect(res.body.postStatusResult).to.eql(0);
                done();
            });
    });

    test('Should return 404 when update a non-existing user`s status', function (done) {
        var req = agent.post(HOST + '/status');
        req
            .send({username: user2.username, status_code: 1, timestamp:user1.timestamp, location:user1.location})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(404);
                done();
            });
    });


    test('Should return 404 when retrieve a non-existing user`s status', function (done) {
        var req = agent.get(HOST + '/status/' + user2.username);
        req
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    test('Should post a announcement successfully', function (done) {
        var req = agent.post(HOST + '/messages/announcements');
            req
                .send({username: user1.username, content: user1.content, timestamp: user1.timestamp, location: user1.location})
                .end(function (err, res) {
                    expect(err).to.not.be.ok();
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    done();
                });
    });

    test('Should return 404 for non-exist user post announcement', function (done) {
        var req = agent.post(HOST + '/messages/announcements');
        req
            .send({username: user2.username, content: user2.content, timestamp: user2.timestamp, location: user2.location})
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    test('Should get all announcements', function (done) {
        var req = agent.get(HOST + '/messages/announcements');
        req
            .end(function (err, res) {
                expect(err).to.not.be.ok();
                expect(res).to.have.property('statusCode');
                expect(res.statusCode).to.equal(200);
                expect(res.body.announcements[0]).to.equal(user1.content);
                done();
            });
    });


});
