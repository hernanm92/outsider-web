var module = angular.module('spotModule', ['ngResource']);

module.factory('spotFactory', ['$resource', 'config', 'Upload',
    function ($resource, config, Upload) {

        var urlBase= config.domain + '/admin';
        var spot = {};

        spot.uploadSpot = function (sports, name, description, address, latitude, longitude, resource, callback) {
            Upload.upload({
                url: urlBase + '/spots',
                data: {
                    sports: sports,
                    name: name,
                    description: description,
                    address: address,
                    latitude: latitude,
                    longitude: longitude,
                    resource: resource
                }
            }).then(function (resp) {
                callback(resp);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log(evt);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.resource.name);
            });
        };

        //todo: update spot will be in here

        return spot;

    }]);