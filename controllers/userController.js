"use strict";

var User = require('../models/user');
var Status = require('../models/status');

module.exports = {

    getAllUsers: function(req, res) {
        console.log('getAllusers');
        User.getAllUsers(function (users, error) {
            if (error) {
                res.sendStatus(500);
            } else {
                res.status(200).send(users);
            }
        });
    },

    getUser: function(req, res) {
        var username = req.params.username;
        console.log('getUser ' + username);
    },

    regUser: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        console.log('regUser ' + username + ' ' + password);
    }

};