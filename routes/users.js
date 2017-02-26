var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.regUser);
router.get('/:username', userController.getUser);

module.exports = router;
