"use strict";

var User = require('../models/user');
var AppErrors = require("../AppErrors");

module.exports = {

    getAllUsers: function(req, res) {
        console.log('~/controllers/userController: getAllusers');
        User.getAllUsers(function (users, error) {
            if (error) {
                res.sendStatus(500);
            } else {
                var outputjson = {"users": users};
                console.log(outputjson);
                res.status(200).send(outputjson);
            }
        });
    },

    getUser: function(req, res) {
        var username = req.params.username;
        console.log('~/controllers/userController: getUser ' + username);
        User.getUser(
            function (user, error) {
                if (error) {
                    if (error instanceof AppErrors.UserNotExisted)
                        res.sendStatus(404);
                    else
                        res.sendStatus(500);
                } else {
                    console.log(user);
                    res.status(200).send(user);
                }
            },
            {"username": username}
        );
    },

    /**
     * regOrLoginResult
     *      0: register succeed
     *      1: user existed, password wrong
     *      2: login succeed
    */
    regOrLogin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var user = new User(username, password);
        user.regOrLogin(
            function (regOrLoginResult, error) {
                if(error) {
                    res.sendStatus(500);
                } else {
                    console.log(regOrLoginResult);
                    if (regOrLoginResult.regOrLoginResult == 0)
                        res.status(201).send(regOrLoginResult);
                    else if (regOrLoginResult.regOrLoginResult == 1)
                        res.status(200).send(regOrLoginResult);
                    else if (regOrLoginResult.regOrLoginResult == 2) {
                        res.status(200).send(regOrLoginResult);
                        // render page after login
                    }
                }
            }
        );
    }

};