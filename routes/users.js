"use strict";

var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
console.log("usr");
router.get('/', usersController.getAllUsers);
router.post('/', usersController.regOrLogin);
router.get('/:username', usersController.getUser);

module.exports = router;
