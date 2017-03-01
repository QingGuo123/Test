angular.module('ESNApp',[])
    .controller('chatPublicController', function ( $location, $http, $scope,$timeout) {


        var socket = io();

    socket.on("connect", function (){
        console.log("User connected via Socket io!");

    });

    //real-time display message
    socket.on("message", function (message) {
        $scope.messages.push({
            username: message.username,
            timestamp: message.timestamp,
            message: message.message
        });
        console.log("send message using socket.io successfully");
    });

    $scope.sendMessage = function () {
        console.log("send message activate!");
        var username = User.getUser().userdata["username"];//need to consider.
        var content = $scope.currentMsg;
        var timestamp = new Date();
        $http.post('/messages/public', {
            "username" : username,
            "content" : content,
            "timestamp" : timestamp
        }).then(function successCallback(response) {
            // Take in the response information
            console.log("post successfully");

        }, function errorCallback(response) {
            console.log("Post failed.");
        });

        socket.emit("message",{
            "username": username,
            "content": content,
            "timestamp": timestamp
        });
    };




    $http.get('/messages/public').then(function (response) {
      //$scope.users = response.data.users;
      console.log(response.data);
      $scope.messages = response.data;
    });

    


});

angular.module('ESNApp')
//.controller('navbarController', function ($scope, $location, $http, $timeout, User, Notification, search, socket, Navbar) {
    .controller('navbarController', function ($scope, $location, $http, $timeout) {
        // handle navbar switch
        $scope.landingPage = function () {
            console.log("Clicked on landingPage");
            window.location.href = "http://localhost:3000/landingPage.html";
            //$location.path('/lobby');
        };
        $scope.chatPublicly = function () {
            console.log("Clicked on chatPublicly");
            window.location.href = "http://localhost:3000/chatPublicly.html";
            // Navbar.message_count = 0;
            // $scope.message_navbar = "";
            //$location.path('/chatpublicly');
        };

        // handle user login/logout
        $scope.navAdministerPage = "hide";
        $scope.navMeasurePerf = "hide";


        $scope.logout = function () {
            console.log("Clicked on logout");
            // $http.get('/logout').then(function(response) {
            // }, function(response) {
            //     console.log(response.status);
            //     console.log(response.status === 302);
            //     if (response.status === 302) {
            //         socket.emit("logout", {
            //             user: User.getUsername()
            //         });
            //         $location.path('/index');
            //     } else {
            //         console.log("Log out failed.");
            //     }
            // });
        };

        // socket.on("logout", function() {
        //     alert("Your account has been set to inactive, the system will log you out now.");
        //     $scope.logout();
        // });

        // // handle message notification
        // $scope.message_navbar = "";
        // socket.on("message", function (message) {
        //     if ($location.$$url !== "/chatpublicly") {
        //         Navbar.message_count = Navbar.message_count + 1;
        //         $scope.message_navbar = Navbar.message_count.toString();
        //     }
        // });

        // $scope.private_message_navbar = "";
        // socket.on('rec_priv_msg', function(message) {
        //     if ($location.$$url !== "/chatprivately") {
        //         Navbar.private_message_count = Navbar.private_message_count + 1;
        //         $scope.private_message_navbar = Navbar.private_message_count.toString();
        //     }
        // });

        // $scope.notification = {
        //     class: "hide",
        //     message: ""
        // };
    });
