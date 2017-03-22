
angular.module('ESNApp',[])
    .controller('chatPublicController', function ($scope, $location, $http, $timeout) {

        var socket = io();
        socket.on("connect", function (){
            console.log("User connected via Socket io!");
        });

        $scope.currentMsg = "";
        $scope.curUsername = "";

    // $http.post('/messages/public', {
    //     "username" : "eric", 
    //     "content" : "hello", 
    //     "timestamp" : timestamp
    // }).then(function successCallback(response) {
    //     // Take in the response information
    //     console.log("post successfully");
    // }, function errorCallback(response) {
    //     console.log("Login failed, please check your user name and password.");
    // });
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
       //  $scope.messages.push({
       //   "username": obj.username,
       //   "content": obj.content,
       //   "timestamp": obj.timestamp
       // });
       //  $scope.$apply();
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
            // Navbar.message_count = 0;
            // $scope.message_navbar = "";
            //$location.path('/chatpublicly');
        };

        // handle user login/logout
        $scope.navAdministerPage = "hide";
        $scope.navMeasurePerf = "hide";

        // $http.post("/users/current_user").then(function (response) {
        //     var username = response.data.username;
        //     var privilegeLevel = response.data.privilege_level;
        //     User.setUsername(username);
        //     User.setLoginorSignup("login");
        //     User.setPrivilegeLevel(privilegeLevel);
        //     $scope.currentUser = username;
        //     $scope.privilegeLevel = privilegeLevel;
        //     switch (privilegeLevel) {
        //         case "Administrator":
        //             $scope.navAdministerPage = "";
        //             $scope.navMeasurePerf = "";
        //             break;
        //         case "Monitor":
        //             $scope.navMeasurePerf = "";
        //             break;
        //         default:
        //             if ($location.$$url === "/measurePerformance" || 
        //                 $location.$$url === "/administratorPage" ||
        //                 $location.$$url === "/administratorUserProfile") {
        //                 $location.url("/lobby");
        //             }
        //             break;
        //     }

        //     if (User.getLoginorSignup() === "login") {
        //         Notification.postNotification($scope, "Welcome back "+User.getUsername()+", what do you wanna do today?", "info");
        //     } else {
        //         Notification.postNotification($scope, "Welcome new user "+User.getUsername()+", what do you wanna do today?", "info");
        //     }

        //     socket.emit('login', {
        //         user: User.getUsername()
        //     });
        // }, function () {
        //     $location.path('/index');
        // });

        $scope.logout = function () {
            $http.get('/logout').then(function (response) {
                window.location.href = "/index.html";
            }, function errorCallback(response) {
                window.location.href = "/index.html";
            });
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
// angular.module('ESNApp')
//     //.controller('navbarController', function ($scope, $location, $http, $timeout, User, Notification, search, socket, Navbar) {
//       .controller('announcementPageCtrl', function ($scope, $location, $http, $timeout) {
//         alert("$scope.currentAnnouncement");
//       });

