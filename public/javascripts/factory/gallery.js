var module = angular.module('galleryModule', ['ngResource']);

module.factory('galleryFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/photos/:id', {id: "@id"}, {
        update: {
            method: 'PUT'
        }
    });
}]);
