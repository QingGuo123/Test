"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/global.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html');
});

router.get('/currentUsername', function(req, res, next) {
    res.status(200).send({"currentUsername": req.session.loginUser});
});

module.exports = router;
