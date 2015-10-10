AuthApp.controller('myCtrl', function(Auth,$scope,$http) {
        // Use your configured Auth service.
      
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
        
         $http.get('/posts')
				.success(function(data) {
					$scope.posts = data;
					console.log(data)
				})
				.error(function(data) {

				});

      

$scope.login = function() {
	    var credentials = {
            email: $scope.email,
            password: $scope.password
        };
	   console.log(credentials)


        Auth.login(credentials, config).then(function(user) {
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            console.log("failed")
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            $scope.currentUser = Auth._currentUser.email

            $http.get('/posts')
				.success(function(data) {
					$scope.posts = data;
					console.log(data)
				})
				.error(function(data) {

				});
            //do an http.get in order to get the posts belonging to 
            //the current user?
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
            $scope.currentUser = Auth._currentUser.email
        });
        }
 $scope.logOut= function() {
 	  var config1 = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        var oldUser = $scope.currentUser;
 	Auth.logout(config1).then(function(oldUser) {
 		$scope.currentUser = ""
 		console.log(oldUser.email)
             alert(oldUser.email + " you're signed out now.");
                $http.get('/posts')
				.success(function(data) {
					$scope.posts = data;
					console.log(data)
				})
				.error(function(data) {

				});
        }, function(error) {
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
        });
 }

        

    });