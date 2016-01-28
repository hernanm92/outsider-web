var module = angular.module('photoModule', ['ngResource']);

module.factory('photoFactory', ['$resource', 'config', 'Upload',
    function ($resource, config, Upload) {

        var urlBase= config.domain + '/admin';
        var post = {};

        post.uploadPhoto = function (sport, title, resource, story, quote,
                                     chosenRiders, spot, callback) {
            Upload.upload({
                url: urlBase + '/photos',
                data: {
                    sport: sport,
                    title: title,
                    type: 'image',
                    resource: resource,
                    story: story,
                    quote: quote,
                    chosenRiders: chosenRiders,
                    spot: spot
                }
            }).then(function (resp) {
                callback(resp);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.resource.name);
            });
        };

        //todo: update post will be in here

        return post;

    }]);