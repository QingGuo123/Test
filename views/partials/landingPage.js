angular.module('ESNApp', [])
    .controller('lobbyPageController', function($scope, $state, $location) {
        $scope.username = User.getUsername();
        // console.log(User.getLoginorSignup());
        // console.log(User.getLoginorSignup() == "login");
        if (User.getLoginorSignup() == "login") {
            $scope.signuporlogin = "back "
        } else {
            $scope.signuporlogin = "newcomer"
        }

        // socket.emit('login', {
        //   user: $scope.username
        // });
    })
    .controller('userDirectoryController', function($scope, $http, $location) {
        var socket = io();

        $scope.users = '';

        socket.on("updateDirectory", function() {
            $http.get('/users').then(function(response) {
                var users_temp = [];
                users_temp = response.data.users;
                //$scope.users = response.data.users;
                for (var i = 0; i < users_temp.length; i++) {
                    if (users_temp[i].onlinestatus == 1) {
                        users_temp[i].onlinestatus = "Online";
                    } else {
                        users_temp[i].onlinestatus = "Offline";
                    }
                }
                $scope.users = users_temp;
            });
        });

        socket.on("error", function() {
            alert("Update directory error.");
        });
        // $scope.sendUserName = function(targetUser){
        //   ChatPrivately.setUsername(targetUser);
        //   console.log("here is used to send username!");
        //   $location.path('/chatprivately');
        // }

        // socket.on('check_online', function(user) {
        //   $scope.users[user.index].ONLINE = user.online;
        // });

        // socket.on('update_status', function(user) {
        //   for (var i in $scope.users) {
        //     if ($scope.users[i].NAME === user.user_name) {
        //       $scope.users[i].STATUS = user.status;
        //       break;
        //     }
        //   }
        // })
        $http.get('/currentUsername').then(function successCallback(response) {
            var myBody = document.getElementById('landingPageBody');
            myBody.style.display = 'block';

            socket.emit("startChatPrivately", { "username": response.data.currentUsername });
            socket.on("ev_to" + response.data.currentUsername, function(obj) {
                if ($scope.chatWithWhom == obj.from || $scope.chatWithWhom == obj.to){
                    $scope.privateMsgs;
                    $http.get('/currentUsername').then(function successCallback(response) {
                        $http.get('/messages/private/' + obj.from + '/' + obj.to).then(function successCallback(response) {
                            $scope.privateMsgs = response.data.privateMessages;
                        });
                    });
                }
                else alert("fuck");

            });

            console.log("response.status: " + response.status);
            $http.get('/users').then(function successCallback(response) {

                var users_temp = [];
                users_temp = response.data.users;

                var temp = [users_temp.length];
                //$scope.users = response.data.users;
                for (var i = 0; i < users_temp.length; i++) {
                    if (users_temp[i].onlinestatus == 1) {
                        users_temp[i].onlinestatus = "Online";
                    } else {
                        users_temp[i].onlinestatus = "Offline";
                    }
                    if (users_temp[i].status.status_code == -1) {
                        users_temp[i].status.status_code = "Undefined";
                    } else if (users_temp[i].status.status_code == 0) {
                        users_temp[i].status.status_code = "Normal";
                    } else if (users_temp[i].status.status_code == 1) {
                        users_temp[i].status.status_code = "Help";
                    } else {
                        users_temp[i].status.status_code = "Emergency";
                    }
                }
                $scope.users = users_temp;
            }, function errorCallback(response) {
                window.location.href = "http://localhost:3000/index.html";
            });
        }, function errorCallback(response) {
            window.location.href = "http://localhost:3000/index.html";
        });


        $scope.sendPrivateMsg = function() {
            var timestamp = new Date();
            $http.get('/currentUsername').then(function successCallback(response) {
                var from = response.data.currentUsername;
                socket.emit("privateMessage", {
                    "from": from,
                    "to": $scope.chatWithWhom,
                    "message": {
                        "content": $scope.currentChatPrivatelyMsg,
                        "timestamp": timestamp,
                        "location": "Mountain View"
                    }
                });
                $http.post('/messages/private', {
                    "sender": from,
                    "receiver": $scope.chatWithWhom,
                    "content": $scope.currentChatPrivatelyMsg,
                    "timestamp": timestamp,
                    "location": "Mountain View",
                }).then(function successCallback(response) {
                    // Take in the response information
                    console.log("post successfully");
                }, function errorCallback(response) {
                    console.log("Login failed, please check your user name and password.");
                });
            });

        }

        $scope.chatWithSb = function(chatUsername) {
            $scope.chatPrivateBool = true;
            $scope.chatWithWhom = chatUsername;
            $scope.privateMsgs;
            $http.get('/currentUsername').then(function successCallback(response) {
                var from = response.data.currentUsername;
                $http.get('/messages/private/' + from + '/' + chatUsername).then(function successCallback(response) {
                    $scope.privateMsgs = response.data.privateMessages;

                });
            });
        }

        $scope.exit = function() {
            $scope.chatPrivateBool = false;
        }

    })
    .controller('statusController', function($scope, $location, $http, $timeout) {

        $scope.updateStatus = function() {

            var curUsername;
            var curStatus_code;
            var timestamp = new Date();
            var location = "Mountain View";

            if ($scope.status == "Ok") {
                curStatus_code = 0;
            } else if ($scope.status == "Help") {
                curStatus_code = 1;
            } else if ($scope.status == "Emergency") {
                curStatus_code = 2;
            } else {
                curStatus_code = -1;
            }

            $http.get('/currentUsername').then(function successCallback(response) {
                var curUsername = response.data.currentUsername;
                //alert(curUsername + curStatus_code + timestamp + location);
                $http.post('/status', {
                    "username": curUsername,
                    "status_code": curStatus_code,
                    "timestamp": timestamp,
                    "location": location
                }).then(function successCallback(response) {
                    // Take in the response information
                    console.log("post successfully");
                }, function errorCallback(response) {
                    console.log("Login failed, please check your user name and password.");
                });
            }, function errorCallback(response) {
                window.location.href = "http://localhost:3000/index.html";
            });
        }
    })
    //.controller('navbarController', function ($scope, $location, $http, $timeout, User, Notification, search, socket, Navbar) {
    .controller('navbarController', function($scope, $location, $http, $timeout) {

        // $scope.click = function(){
        //   alert("cnm");
        // }

        var socket = io();


        $http.get('/currentUsername').then(function(response) {
            $scope.curUser = response.data.currentUsername;

        });

        // handle navbar switch
        $scope.landingPage = function() {
            console.log("Clicked on landingPage");
            window.location.href = "http://localhost:3000/landingPage.html";
            // $http.post('/land', {
            //   'type':'land'
            // }).then(function successCallback(response) {
            //   // Take in the response information
            //   console.log("post successfully");
            // }, function errorCallback(response) {
            //   console.log("post error");
            // });
            //$location.path('/lobby');
        };
        $scope.chatPublicly = function() {
            console.log("Clicked on chatPublicly");
            window.location.href = "http://localhost:3000/chatPublicly.html";
            // Navbar.message_count = 0;
            // $scope.message_navbar = "";
            //$location.path('/chatpublicly');
        };

        // handle user login/logout
        $scope.navAdministerPage = "hide";
        $scope.navMeasurePerf = "hide";

        $scope.logout = function() {
            $http.get('/logout').then(function(response) {
                socket.emit("userLogout", { "username": $scope.curUser });
                window.location.href = "http://localhost:3000/index.html";
            }, function errorCallback(response) {
                socket.emit("userLogout", { "username": $scope.curUser });
                window.location.href = "http://localhost:3000/index.html";
            });
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
    });
