app.controller('TeamMemberController',
    function ($scope, teamMemberFactory, teamsFactory, spotsFactory, $routeParams, eventService) {


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

        $scope.getRider = function () {
            teamsFactory.get({"id": $routeParams.rider}, function(rider){
                $scope.rider = rider;
            });
        };
        console.log($routeParams.rider);
        $scope.rider= {};
        $scope.rider.spot= {};
        if ($routeParams.rider != undefined) $scope.getRider();


        $scope.upload = function () {
            var team= $scope.rider;
            teamMemberFactory.uploadTeamMember(team.sport, team.name, team.alias, team.photo_url, team.procedence,
                team.residence, team.birthdate, team.stance, team.spot.name, team.quote, team.description,
                team.facebook, team.instagram, team.twitter, function (res) {
                //go to where it has to
                window.location = '#/admin/riders';
            });
        }
    }
);
app.controller('AdminRidersController',
    function ($scope, teamsFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });

        var riders= $scope;

        $scope.getRiders = function () {
            teamsFactory.query({},function(riderss){
                $scope.riders=riderss;
            });
        };
        $scope.getRiders();

        $scope.editRider = function (id) {
            window.location= '#admin/rider/'+id;
        };

        $scope.deleteRider = function (id) {
            //todo: destroy
        }

    }
);