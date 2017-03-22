/**
 * Created by jinliang on 3/19/17.
 */
var expect = require('expect.js');

var User = require('../models/user.js');
var Status = require('../models/status.js');
var Announcement = require('../models/announcement.js');
var Message = require('../models/message.js');
var PrivateMessage = require('../models/privateMessage.js');

// var PORT = process.env.PORT | 3000;
// var HOST = 'http://localhost:' + PORT;
//
// //Init a server
// var debug = require('debug')('ESN');
// var app = require('../app.js');
//
// app.set('port', PORT);
// app.set('testing', true);
//
// var serverInit = function () {
//     debug('Express server listening on port' + PORT);
// };
//
// var server = app.listen(app.get('port'), serverInit)
//     .on('error', function(err){
//         if(err.code === 'EADDRINUSE'){
//             PORT++;
//             HOST = 'http://localhost:'+PORT;
//             app.set('port', PORT);
//             server = app.listen(app.get('port'), serverInit)
//         }
//     });

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

suite('Test all Model', function () {
    test('- Identify whether able to register or login', function (done) {
        var test_user = new User(user1.username, user1.password);
        test_user.regOrLogin(function (res1) {
            console.log(res1);
            if(res1.regOrLoginResult == 0){
                //No test_user in DB
                test_user.regOrLogin(function (res2) {
                    expect(res2.regOrLoginResult).to.equal(2);
                });
            }else{
                //test_user already exists in DB
                expect(res1.regOrLoginResult).to.equal(2);
            }
            done();
        });
    });


    test('- Identify whether another user is able to register or login ', function (done) {
        var test_user = new User(user3.username, user3.password);
        test_user.regOrLogin(function (res1) {
            console.log(res1);
            if(res1.regOrLoginResult == 0){
                //No test_user in DB
                test_user.regOrLogin(function (res2) {
                    expect(res2.regOrLoginResult).to.equal(2);
                });
            }else{
                //test_user already exists in DB
                expect(res1.regOrLoginResult).to.equal(2);
            }
            done();
        });
    });

    test('- Identify whether able to get the exist test_user', function (done) {
        User.getUser(function (user, err) {
            expect(err).to.not.be.ok();
            expect(user.username).to.equal(user1.username);
            done();
        }, {"username": user1.username});

    });

    test(' - Identify whether able to get all exist test_users', function (done) {
        User.getAllUsers(function (users, err) {
            expect(err).to.not.be.ok();
            expect(users[0].username).to.equal(user1.username);
            done();
        }, {"username": user1.username});

    });

    test(' - Identify not able to get a non-exist user', function (done) {
        User.getUser(function (user, err) {
            // expect(err).to.not.be.ok();
            expect(user).to.equal(null);
            expect(err.message).to.equal('User not existed.');
            done();
        }, {"username": user2.username});

    });

    test(' - Identify not able to get all non-exist test_users', function (done) {
        User.getAllUsers(function (users, err) {
            expect(err).to.not.be.ok();
            expect(users[0].username).to.not.equal(user2.username);
            done();
        }, {"username": user1.username});

    });


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

    test(' - Identify a exist user can post a announcement', function (done) {
        var announcement = new Announcement(user1.username, user1.content, user1.timestamp, user1.location);
        announcement.postAnnouncement(function (res, err) {
            expect(err).to.equal(null);
            expect(res.postAnnouncementResult).to.equal(0);
            done();
        });
    });

    test(' - Identify a non-exist user cannot post a announcement', function (done) {
        var announcement = new Announcement(user2.username, user2.content, user2.timestamp, user2.location);
        announcement.postAnnouncement(function (res, err) {
            expect(err.message).to.equal('User not existed.');
            expect(res).to.equal(null);
            done();
        });
    });


    test(' - Identify can get all announcements', function (done) {
        var announcement = new Announcement(user1.username, user1.content, user1.timestamp, user1.location);
        Announcement.getAllAnnouncements(function (res, err) {
            expect(res[0].username).to.equal(announcement.username);
            expect(res[0].content).to.equal(announcement.content);
            expect(res[0].timestamp).to.equal(announcement.timestamp);
            expect(res[0].location).to.equal(announcement.location);
            expect(err).to.equal(null);
            done();
        });
    });

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
