var module = angular.module('teamMemberModule', ['ngResource']);

module.factory('teamMemberFactory', ['$resource', 'config', '$http',
    function ($resource, config, $http) {

        var urlBase= config.domain + '/admin';
        var team = {};

        team.uploadTeamMember = function (sport, name, nickname, photo, procedence, residence, birthdate,
                                          stance, spot, description, callback) {
            return $http.post(urlBase + '/team-member', {
                sport: sport,
                name: name,
                nickname: nickname,
                photo: photo,
                procedence: procedence,
                residence: residence,
                birthdate: birthdate,
                stance: stance,
                spot: spot,
                description: description
            }).then(function () {
                callback();
            }, function (response) {
                throw response;
            });
        };

        //todo: update team member will be in here

        return team;

    }]);