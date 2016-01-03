var module = angular.module('blogModule', ['ngResource']);

module.factory('blogFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/posts/:id', {id: "@id"}, {
        update: {
            method: 'PUT'
        }
    });
}]);
