var AuthApp = angular.module("AuthApp", ['Devise']).
    config(function(AuthProvider) {
        // Configure Auth service with AuthProvider
    }).
    controller('myCtrl', function(Auth) {
        // Use your configured Auth service.
        console.log(Auth._currentUser);
        console.log(Auth.isAuthenticated());
    });