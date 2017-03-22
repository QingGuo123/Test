"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/global.js');
console.log("index");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html');
});

router.get('/currentUsername', function(req, res, next) {
    res.status(200).send({"currentUsername": req.session.loginUser});
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if(err)
            res.sendStatus(500);
        res.clearCookie("session");
        res.sendStatus(200);
    });
});

module.exports = router;
