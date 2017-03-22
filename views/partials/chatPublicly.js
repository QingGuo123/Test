
angular.module('ESNApp',[])
    .controller('chatPublicController', function ($scope, $location, $http, $timeout) {

        var socket = io();
        socket.on("connect", function (){
            console.log("User connected via Socket io!");
        });

        $scope.currentMsg = "";
        $scope.curUsername = "";

    $scope.sendMessage = function(){
        var timestamp = new Date();
        $http.get('/currentUsername').then(function successCallback(response) {

            $scope.curUsername = response.data.currentUsername;
            console.log($scope.curUsername + " + " + $scope.currentMsg + " + " + timestamp);
            $http.post('/messages/public', {
                "username" : $scope.curUsername,
                "content" : $scope.currentMsg,
                "timestamp" : timestamp,
                "location" : "Mountain View"
            }).then(function successCallback(response) {
                // Take in the response information
                console.log("post successfully");
            }, function errorCallback(response) {
                console.log("Login failed, please check your user name and password.");
            });

            socket.emit("message",{
                "username": $scope.curUsername,
                "content": $scope.currentMsg,
                "timestamp" : timestamp
            });
            $scope.currentMsg = "";

        },function errorCallback(response){
                window.location.href = "/index.html";
        });

    };

        var getAllPublicMessages = function () {
            $http.get('/currentUsername').then(function successCallback(response) {
                console.log("response.status: " + response.status);
                var myBody = document.getElementById('chatPubliclyBody');
                myBody.style.display = 'block';
                $http.get('/messages/public').then(function (response) {
                    //$scope.users = response.data.users;

                    for(var index = 0; index < response.data.messages.length;index++){
                        if(response.data.messages[index].status_code == -1){
                            response.data.messages[index].status_code = "fa fa-circle";
                            response.data.messages[index].iconcolor = "white";
                        }else if(response.data.messages[index].status_code == 0){
                            response.data.messages[index].status_code = "fa fa-circle";
                            response.data.messages[index].iconcolor = "green";
                        }else if(response.data.messages[index].status_code == 1){
                            response.data.messages[index].status_code = "fa fa-circle";
                            response.data.messages[index].iconcolor = "yellow";
                        }else{
                            response.data.messages[index].status_code = "fa fa-circle";
                            response.data.messages[index].iconcolor = "red";
                        }

                    }

                    $scope.messages = response.data.messages;
                    console.log($scope.messages);
                });
            }, function errorCallback(response){
                window.location.href = "/index.html";
            });
        };

        getAllPublicMessages();

    socket.on("message", function(obj){
        getAllPublicMessages();
    });

    })
    .controller('announcementPageCtrl', function ($scope, $location, $http, $timeout) {

        var socket = io();

        $http.get('/messages/announcements').then(function successCallback(response) {
            console.log(response.data.announcements);
            $scope.announcements = response.data.announcements;
        }, function errorCallback(response){
            window.location.href = "/index.html";
        });
        socket.on("announcement", function(obj){
            $scope.announcements.push({
                "username": obj.username,
                "content": obj.content,
                "timestamp": obj.timestamp,
                "location": obj.location
            });
            $scope.$apply();
        });

        //$scope.announcements = ["one", "two", "three"];
        $scope.postAnnouncement = function(){
            var timestamp = new Date();
            $http.get('/currentUsername').then(function successCallback(response) {

                $scope.curUsername = response.data.currentUsername;
                $http.post('/messages/announcements', {
                    "username" : $scope.curUsername,
                    "content" : $scope.currentAnnouncement,
                    "timestamp" : timestamp,
                    "location" : "Mountain View"
                }).then(function successCallback(response) {
                    // Take in the response information
                    console.log("post successfully");
                }, function errorCallback(response) {
                    console.log("Login failed, please check your user name and password.");
                });
                socket.emit("announcement",{
                    "username" : $scope.curUsername,
                    "content" : $scope.currentAnnouncement,
                    "timestamp" : timestamp,
                    "location" : "Mountain View"
                });
                $scope.currentAnnouncement = "";

            },function errorCallback(response){
                    window.location.href = "/index.html";
            });
        }  
    })

angular.module('ESNApp')
    //.controller('navbarController', function ($scope, $location, $http, $timeout, User, Notification, search, socket, Navbar) {
      .controller('navbarController', function ($scope, $location, $http, $timeout) {
        // handle navbar switch
        $scope.curUser = '';
        
        $http.get('/currentUsername').then(function (response) {
            $scope.curUser = response.data.currentUsername;
            
        });



        $scope.landingPage = function () {
            console.log("Clicked on landingPage");
            window.location.href = "/landingPage.html";
            //$location.path('/lobby');
        };
        $scope.chatPublicly = function () {
            console.log("Clicked on chatPublicly");
            window.location.href = "/chatPublicly.html";
        };

        // handle user login/logout
        $scope.navAdministerPage = "hide";
        $scope.navMeasurePerf = "hide";

        $scope.logout = function () {
            $http.get('/logout').then(function (response) {
                window.location.href = "/index.html";
            }, function errorCallback(response) {
                window.location.href = "/index.html";
            });
        };


    });


