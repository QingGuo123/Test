/**
 * Created by jinliang on 3/22/17.
 */
var expect = require('expect.js');

var User = require('../models/user.js');
var Status = require('../models/status.js');
var Announcement = require('../models/announcement.js');
var Message = require('../models/message.js');
var PrivateMessage = require('../models/privateMessage.js');

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

suite('Test messgage component', function () {

    test(' - Identify a exist user can post a public message', function (done) {
        var message = new Message(user1.username, user1.content, user1.timestamp, user1.location);
        message.postPublicMessage(function (res, err) {
            expect(err).to.equal(null);
            expect(res.postPublicMessageResult).to.equal(0);
            done();
        });
    });

    test(' - Identify a non-exist user cannot post a public message', function (done) {
        var message = new Message(user2.username, user2.content, user2.timestamp, user2.location);
        message.postPublicMessage(function (res, err) {
            expect(err.message).to.equal('User not existed.');
            expect(res).to.equal(null);
            done();
        });
    });

    test(' - Identify a exist user can get public message', function (done) {
        var message = new Message(user1.username, user1.content, user1.timestamp, user1.location);
        Message.getPublicMessage(function (messages, err) {
            expect(err).to.equal(null);
            expect(messages[0].username).to.equal(message.username);
            expect(messages[0].content).to.equal(message.content);
            expect(messages[0].timestamp).to.equal(message.timestamp);
            expect(messages[0].location).to.equal(message.location);
            done();
        }, {'username': user1.username});
    });

    test(' - Identify a non-exist user cannot get public message', function (done) {
        Message.getPublicMessage(function (messages, err) {
            expect(err.message).to.equal('User not existed.');
            expect(messages).to.equal(null);
            done();
        }, {'username': user2.username});
    });

    test(' - Identify can get all public message', function (done) {
        var message = new Message(user1.username, user1.content, user1.timestamp, user1.location);
        Message.getAllPublicMessages(function (messages, err) {
            expect(err).to.equal(null);
            expect(messages[0].username).to.equal(message.username);
            expect(messages[0].content).to.equal(message.content);
            expect(messages[0].timestamp).to.equal(message.timestamp);
            expect(messages[0].location).to.equal(message.location);
            done();
        });
    });


});