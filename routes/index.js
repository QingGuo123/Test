var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('partials/index', { title: 'Emergency Social Network - SV2' });
});

module.exports = router;
