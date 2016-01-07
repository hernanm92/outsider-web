var module = angular.module('postModule', ['ngResource']);

module.factory('postFactory', ['$resource', 'config', '$http',
    function ($resource, config, $http) {

        var urlBase= config.domain + '/admin';
        var post = {};

        post.uploadPost = function (resource, story, callback) {
            return $http.post(urlBase + '/post', {
                resource: resource,
                story: story
            }).then(function () {
                callback();
            }, function (response) {
                throw response;
            });
        };

        //todo: update post will be in here

        return post;

    }]);