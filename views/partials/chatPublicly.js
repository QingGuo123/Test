
angular.module('ESNApp',[])
    .factory('socket', function(socketFactory) {
        return socketFactory();
    }).value('version', '0.1')
    .controller('chatPublicController', function ($scope, $location, $http, $timeout, socket) {
    
    socket.on("connect", function (){
            console.log("User connected via Socket io!");
    });

    $scope.messages = [];
    $scope.messages.push({
        username: 'David',
        timestamp: '02/25/2017 18:05:14',
        message: 'hello, David!'
    });


    // {
    //     {
    //         username:'David',
    //         message:'hello, David!',
    //         timestamp: '02/25/2017 18:04:59'
    //     },
    //     {
    //         username:'Eric',
    //         message:'hello, Eric!',
    //         timestamp: '02/25/2017 18:05:14'
    //     }
    // }

});

angular.module('ESNApp')
    //.controller('navbarController', function ($scope, $location, $http, $timeout, User, Notification, search, socket, Navbar) {
      .controller('navbarController', function ($scope, $location, $http, $timeout) {
        // handle navbar switch
        $scope.landingPage = function () {
            console.log("Clicked on landingPage");
            //$location.path('/lobby');
        };
        $scope.chatPublicly = function () {
            console.log("Clicked on chatPublicly");
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
