var module = angular.module('authModule', ['ngResource']);

module.factory('authFactory', ['$resource', 'config', '$http', '$window',
    function ($resource, config, $http, $window) {

    var urlBase= config.domain + '/admin';
    var auth= {};

    auth.login = function (user, pass, callback) {
        //$window.sessionStorage.authenticated = 'true';
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
        delete $window.sessionStorage.authenticated;
        return $http.post(urlBase + '/logout').then(function () {
            delete $window.sessionStorage.authenticated;
        });
    };

    auth.isAuthenticated = function () {
        return $window.sessionStorage.authenticated === 'true';
    };
    return auth;

}]).run(function ($rootScope, $location, authFactory) {
    $rootScope.$on('$routeChangeStart', function (event, toState) {
        // Not authenticated. Go to login...
        var originalPath = toState.$$route.originalPath;
        if (!authFactory.isAuthenticated() && originalPath !== '/admin/login' && originalPath.substring(0, 6) === '/admin') {
            $location.path('/admin/login');
            event.preventDefault();
        }
    });
});