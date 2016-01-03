var module = angular.module('teamsModule', ['ngResource']);

module.factory('teamsFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/riders/:id', {id: "@id"}, {
        update: {
            method: 'PUT'
        }
    });
}]);
