"use strict";

var express = require('express');
var router = express.Router();
var messagesController = require('../controllers/messagesController');

router.get('/public', messagesController.getAllPublicMessages);
router.post('/public', messagesController.postPublicMessage);
router.get('/public/:username', messagesController.getPublicMessage);

module.exports = router;
