app.controller('TeamMemberController',
    function ($scope, teamMemberFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
            Masking.initMasking();
            Datepicker.initDatepicker();
            Validation.initValidation();
            StyleSwitcher.initStyleSwitcher();
        });

        var team= $scope;

        $scope.upload = function () {
            teamMemberFactory.uploadTeamMember(team.sport, team.name, team.nickname, team.photo, team.procedence,
                team.residence, team.birthdate, team.stance, team.spot, team.description, function () {
                //go to where it has to
                window.location = '/';
            });
        }
    }
);