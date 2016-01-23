app.controller('TeamMemberController',
    function ($scope, teamMemberFactory, spotsFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
            Masking.initMasking();
            Datepicker.initDatepicker();
            Validation.initValidation();
            StyleSwitcher.initStyleSwitcher();
        });

        $scope.getSpots = function () {
            spotsFactory.query({},function(spots){
                $scope.spots=spots;
            });
        };

        $scope.getSpots();

        var team= $scope;

        $scope.upload = function () {
            teamMemberFactory.uploadTeamMember(team.sport, team.name, team.alias, team.file, team.procedence,
                team.residence, team.birthdate, team.stance, team.spot, team.quote, team.description,
                team.fb, team.inst, team.tw, function (res) {
                //go to where it has to
                window.location = '/';
            });
        }
    }
);