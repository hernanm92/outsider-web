var module = angular.module('teamMemberModule', ['ngResource']);

module.factory('teamMemberFactory', ['$resource', 'config', 'Upload',
    function ($resource, config, Upload) {

        var urlBase= config.domain + '/admin';
        var team = {};

        team.uploadTeamMember = function (sport, name, nickname, photo, procedence, residence, birthdate,
                                          stance, spot, description, callback) {
            Upload.upload({
                url: urlBase + '/teamMember',
                data: {
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
                }
            }).then(function (resp) {
                callback(resp);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log(evt);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.photo.name);
            });
        };

        //todo: update team member will be in here

        return team;

    }]);