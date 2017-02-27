"use strict";

var User = require('../models/user');

module.exports = {

    getAllUsers: function(req, res) {
        console.log('~/controllers/userController: getAllusers');
        User.getAllUsers(function (users, error) {
            if (error) {
                res.sendStatus(500);
            } else {
                res.status(200).send(users);
            }
        });
    },

    getUser: function(req, res) {
        console.log('~/controllers/userController: getUser');

        var username = req.params.username;
        User.getUser(function (user, error) {
            if(error) {
                res.sendStatus(500);
            } else {
                res.status(200).send(user);
            }
        }, username);
        console.log('getUser ' + username);
    },

    signUpLogin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var user = new User(username, password);

        user.checkUserName(function (exist, err) {
            if (err) {
                res.status(500).send("err occur");
            } else {
                if (exist) {
                    user.setUserOnline(function (result, error) {
                        if (error) {
                            res.status(500).send(error.message);
                        } else {
                            if (validate_result !== false) {
                                res.status(200).send("login success");
                            }
                        }
                    });
                } else {
                    user.addNewUser(function (result, error) {
                        if (error) {
                            res.status(500).send("error occur");
                        } else {
                            res.status(200).send("signUp success");
                        }
                    });
                }
            }
        });
    }

};