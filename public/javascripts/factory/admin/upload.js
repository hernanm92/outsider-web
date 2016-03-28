var module = angular.module('uploadModule', ['ngResource']);

module.factory('uploadFactory', ['$resource', 'config', 'Upload',
    function ($resource, config, Upload) {

        var urlBase= config.domain;
        var uploader = {};

        uploader.upload= function (photo, callback) {
            Upload.upload({
                url: urlBase + '/upload',
                data: {
                    photo_url: photo
                }
            }).then(function (resp) {
                callback(resp);
            }, function (resp) {
            }, function (evt) {
            });
        };

        return uploader;

    }]);
