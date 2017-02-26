module.exports = {

    getAllPublicMessages: function(req, res) {
        console.log('getAllPublicMessages');
    },

    getPublicMessage: function(req, res) {
        var username = req.params.username;
        console.log('getPublicMessage ' + username);
    },

    postPublicMessage: function(req, res) {
        var username = req.body.username;
        var message = req.body.message;
        var timestamp = req.body.timestamp;
        console.log('postPublicMessage ' + username + ' ' + message + ' ' + timestamp);
    }

};