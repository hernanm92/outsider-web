var module = angular.module('postModule', ['ngResource']);

module.factory('postFactory', ['$resource', 'config', 'Upload',
    function ($resource, config, Upload) {

        var urlBase= config.domain + '/admin';
        var post = {};

        post.uploadPost = function (sport, resource, story, callback) {
            console.log('de lujo');
            Upload.upload({
                url: urlBase + '/post',
                data: {
                    sport: sport,
                    resource: resource,
                    story: story
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

        //todo: update post will be in here

        return post;

    }]);