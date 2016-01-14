var module = angular.module('spotsModule', ['ngResource']);

module.factory('spotsFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/spots/:id', {id: "@id"}, {
        update: {
            method: 'PUT'
        }
    });
}]);