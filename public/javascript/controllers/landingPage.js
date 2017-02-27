

angular.module('ESNApp', [])
  .controller('lobbyPageController', function($scope, $state, $location, User, socket) {
    $scope.username = User.getUsername();
    // console.log(User.getLoginorSignup());
    // console.log(User.getLoginorSignup() == "login");
    if (User.getLoginorSignup() == "login") {
      $scope.signuporlogin = "back "
    } else {
      $scope.signuporlogin = "newcomer"
    }

    socket.emit('login', {
      user: $scope.username
    });
	})
  .controller('userDirectoryController', function ($scope, $http, $location, User, socket) {

    // $http.get('/users').then(function (response) {
    //   $scope.users = response.data;
    //   for (var i in $scope.users) {
    //     $scope.users[i].ONLINE = "Checking online...";
    //     socket.emit('check_online', {
    //       "user": $scope.users[i].NAME,
    //       "index": i
    //     });
    //   }
    // });

    // $scope.sendUserName = function(targetUser){
    //   ChatPrivately.setUsername(targetUser);
    //   console.log("here is used to send username!");
    //   $location.path('/chatprivately');
    // }

    // socket.on('check_online', function(user) {
    //   $scope.users[user.index].ONLINE = user.online;
    // });

    socket.on('update_status', function(user) {
      for (var i in $scope.users) {
        if ($scope.users[i].NAME === user.user_name) {
          $scope.users[i].STATUS = user.status;
          break;
        }
      }
    })
  })
  .controller('statusController', function($scope, $location, $http, $timeout){

})
    //.controller('navbarController', function ($scope, $location, $http, $timeout, User, Notification, search, socket, Navbar) {
  .controller('navbarController', function ($scope, $location, $http, $timeout) {
        // handle navbar switch
        $scope.landingPage = function () {
            console.log("Clicked on landingPage");
            alert("Clicked on landingPage");
            //$location.path('/lobby');
        };
        $scope.chatPublicly = function () {
            console.log("Clicked on chatPublicly");
            alert("Clicked on chatPublicly");
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
  });
