var module = angular.module('spotModule', ['ngResource']);

module.factory('spotFactory', ['$resource', 'config', '$http',
    function ($resource, config, $http) {

        var urlBase= config.domain + '/admin';
        var spot = {};

        spot.uploadSpot = function (resource, story, callback) {
            return $http.post(urlBase + '/spot', {
                resource: resource,
                story: story
            }).then(function () {
                callback();
            }, function (response) {
                throw response;
            });
        };

        //todo: update spot will be in here

        return spot;

    }]);