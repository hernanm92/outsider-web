var module = angular.module('homeModule', ['ngResource']);

module.factory('homeFactory', ['$resource', 'config', function ($resource, config) {
    return $resource(config.domain + '/general/:id', {id: "@id"}, {
    	update: {
    		method: 'PUT'
    	}
    });
}]);
