angular.module('ESNApp',[])
    .controller('chatPublicController', function ($scope, $location, $http, $timeout) {

        var socket = io();

    $scope.currentMsg = "";

    socket.on("connect",function () {
        console.log("socket has connected.");
    });


    socket.on("message", function (message) {
            console.log("send message using socket.io successfully");
            $scope.messages.push({
                username: message.username,
                content: message.content,
                timestamp: message.timestamp
            });

        });

$scope.sendMessage = function(){
    var timestamp = new Date();
    console.log($scope.currentMsg);
    $http.post('/messages/public', {
        "username" : "jinliang",
        "content" : $scope.currentMsg,
        "timestamp" : timestamp
    }).then(function successCallback(response) {
        // Take in the response information
        console.log("post successfully");
    }, function errorCallback(response) {
            console.log("Login failed, please check your user name and password.");
        });

    console.log("test");

        socket.emit("message",{
            "username": "jinliang",
            "content": $scope.currentMsg,
            "timestamp": timestamp
        });
    };


    $http.get('/messages/public').then(function (response) {
      console.log(response.data.messages);
      for(var i = 0; i < 10; i++){
          $scope.messages.push({
              username: response.data.messages.username,
              content: response.data.messages.content,
              timestamp: response.data.messages.timestamp
          });
      }
    });
    
    $scope.logout = function () {
        console.log("click logout button.");
        $http.get("/index").then(function (response) {
            
        })
    }

    


});

angular.module('ESNApp')
    .controller('navbarController', function ($scope, $location, $http, $timeout) {
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
