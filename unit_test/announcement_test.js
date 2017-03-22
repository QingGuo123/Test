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


suite('Test announcement component', function () {

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

});