"use strict";

var Message = require('../models/message');

module.exports = {

    getAllPublicMessages: function(req, res) {
        var callback = function(allpubmsg, err) {
            if (err)
                res.sendStatus(500);
            else
                res.status(200).send(allpubmsg);
        };
        Message.getAllPublicMessages(callback);
    },

    getPublicMessage: function(req, res) {
        var username = req.params.username;
        var callback = function(pubmsg, err) {
            if (err)
                res.sendStatus(500);
            else
                res.status(200).send(pubmsg);
        };
        Message.getPublicMessage(callback, username);
    },

    postPublicMessage: function(req, res) {
        var username = req.body.username;
        var message = req.body.message;
        var timestamp = req.body.timestamp;
        var callback = function(status, err) {
            if (err)
                res.sendStatus(500);
            else
                res.status(200).send(status);
        };
        Message.postPublicMessage(callback, username, message, timestamp);
    }

};
