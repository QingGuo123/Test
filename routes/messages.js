"use strict";

var express = require('express');
var router = express.Router();
var messagesController = require('../controllers/messagesController');
var privateMessagesController = require('../controllers/privateMessagesController');
var announcementsController = require('../controllers/announcementsController');

router.get('/public', messagesController.getAllPublicMessages);
router.post('/public', messagesController.postPublicMessage);
router.get('/public/:username', messagesController.getPublicMessage);

router.get('/announcements', announcementsController.getAllAnnouncements);
router.post('/announcements', announcementsController.postAnnouncement);

router.get('/private/:sender/:receiver', privateMessagesController.getPrivateMessage);
router.post('/private', privateMessagesController.postPrivateMessage);
router.post('/private/resetunread', privateMessagesController.resetUnreadMessages);

module.exports = router;
