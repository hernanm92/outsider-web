var module = angular.module('authModule', ['ngResource']);

module.factory('authFactory', ['$resource', 'config', function ($resource, config) {

    var urlBase= config.domain + '/admin';
    var auth= {};

    auth.login = function (user, pass, callback) {
        return $http.post(urlBase + '/login', {
            username: user,
            password: pass
        }).then(function () {
            $window.sessionStorage.authenticated = 'true';
            callback();
        }, function (response) {
            delete $window.sessionStorage.authenticated;
            throw response;
        });
    };

    auth.getCurrentUser = function(){
        return $http.get(urlBase + '/users/current');
    };

    auth.logout = function () {
        return $http.post(urlBase + '/logout').then(function () {
            delete $window.sessionStorage.authenticated;
        });
    };

    auth.isAuthenticated = function () {
        return $window.sessionStorage.authenticated === 'true';
    };
    return auth;

}]);
//    .run(function ($rootScope, $state, authFactory) {
//    $rootScope.$on('$stateChangeStart', function (event, toState) {
//        // Not authenticated. Go to login...
//        if (!authFactory.isAuthenticated() && toState.name !== 'admin.login') {
//            $state.go('admin.login');
//            event.preventDefault();
//        }
//    });
//});