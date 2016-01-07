var module = angular.module('teamMemberModule', ['ngResource']);

module.factory('teamMemberFactory', ['$resource', 'config', '$http',
    function ($resource, config, $http) {

        var urlBase= config.domain + '/admin';
        var team = {};

        team.uploadTeamMember = function (resource, story, callback) {
            return $http.post(urlBase + '/team-member', {
                resource: resource,
                story: story
            }).then(function () {
                callback();
            }, function (response) {
                throw response;
            });
        };

        //todo: update team member will be in here

        return team;

    }]);