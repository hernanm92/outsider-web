var module = angular.module('spotModule', ['ngResource']);

module.factory('spotFactory', ['$resource', 'config', '$http',
    function ($resource, config, $http) {

        var urlBase= config.domain + '/admin';
        var spot = {};

        spot.uploadSpot = function (sports, name, address, latitude, longitude, callback) {
            return $http.post(urlBase + '/spot', {
                sports: sports,
                name: name,
                address: address,
                latitude: latitude,
                longitude: longitude
            }).then(function () {
                callback();
            }, function (response) {
                throw response;
            });
        };

        //todo: update spot will be in here

        return spot;

    }]);