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

suite('Test private message component', function () {

    test(' - Identify a exist user can post a private message successfully', function (done) {
        var privateMessage = new PrivateMessage(user1.username, user3.username,user1.content,user1.timestamp, user1.location );
        privateMessage.postPrivateMessage(function (res, err) {
            expect(err).to.equal(null);
            expect(res.postPrivateMessageResult).to.equal(0);
            done();
        });
    });

    test(' - Identify non-exist sender send a private message to a exist receiver', function (done) {
        var privateMessage = new PrivateMessage(user2.username, user3.username,user2.content,user2.timestamp, user2.location );
        privateMessage.postPrivateMessage(function (res, err) {
            expect(res).to.equal(null);
            expect(err.message).to.equal('Sender not existed.');
            done();
        });
    });

    test(' - Identify a exist sender send a private message to a non-exist receiver', function (done) {
        var privateMessage = new PrivateMessage(user1.username, user2.username,user1.content,user1.timestamp, user1.location );
        privateMessage.postPrivateMessage(function (res, err) {
            expect(res).to.equal(null);
            expect(err.message).to.equal('Receiver not existed.');
            done();
        });
    });

    test(' - Identify a exist receiver resets a unread message', function (done) {
        PrivateMessage.resetUnreadMessages(function (res, err) {
            expect(err).to.equal(null);
            expect(res.resetUnreadMessagesResult).to.equal(0);
            done();
        }, {'sender': user1.username, 'receiver': user3.username});
    });

    test(' - Identify a exist receiver get private messages from a exist sender', function (done) {
        var privateMessage = new PrivateMessage(user1.username, user3.username,user1.content,user1.timestamp, user1.location );
        PrivateMessage.getPrivateMessage(function (res,err) {
            expect(err).to.equal(null);
            expect(res[0].sender).to.equal(privateMessage.sender);
            expect(res[0].receiver).to.equal(privateMessage.receiver);
            expect(res[0].content).to.equal(privateMessage.content);
            expect(res[0].timestamp).to.equal(privateMessage.timestamp);
            expect(res[0].location).to.equal(privateMessage.location);
            done();
        }, {'sender': user1.username, 'receiver': user3.username});
    });


    test(' - Identify a non-exist receiver get private messages from a exist sender', function (done) {
        var privateMessage = new PrivateMessage(user2.username, user3.username,user2.content,user2.timestamp, user2.location );
        PrivateMessage.getPrivateMessage(function (res,err) {
            expect(err.message).to.equal('Sender not existed.');
            expect(res).to.equal(null);
            done();
        }, {'sender': user2.username, 'receiver': user3.username});
    });

    test(' - Identify a exist receiver get private messages from a non-exist sender', function (done) {
        var privateMessage = new PrivateMessage(user1.username, user2.username,user1.content,user1.timestamp, user1.location );
        PrivateMessage.getPrivateMessage(function (res,err) {
            expect(err.message).to.equal('Receiver not existed.');
            expect(res).to.equal(null);
            done();
        }, {'sender': user1.username, 'receiver': user2.username});
    });

});