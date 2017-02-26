module.exports = {

    getAllUsers: function(req, res) {
        console.log('getAllusers');
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