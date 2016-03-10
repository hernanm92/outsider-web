app.controller('TeamMemberController',
    function ($scope, teamMemberFactory, teamsFactory, spotsFactory, $routeParams, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
            Masking.initMasking();
            Datepicker.initDatepicker();
            Validation.initValidation();
            StyleSwitcher.initStyleSwitcher();
        });
        $scope.chosenSpots= [];

        $scope.getSpots = function () {
            spotsFactory.query({},function(spots){
                $scope.spots=spots;
            });
        };

        $scope.getSpots();

        $scope.getRider = function () {
            teamsFactory.get({"id": $routeParams.rider}, function(rider){
                $scope.rider = rider;
                $scope.chosenSpots = rider.spots ? rider.spots : [];
            });
        };
        console.log($routeParams.rider);
        $scope.rider= {};
        $scope.rider.spot= {};
        if ($routeParams.rider != undefined) $scope.getRider();



        $scope.spotChosen= function(){
            for (var i = 0; i < $scope.spots.length; i++) {
                var sid = $scope.spots[i];
                if ($scope.chosen == sid.name) {
                    var idx= $scope.chosenSpots.indexOf(sid);
                    if (idx < 0) $scope.chosenSpots.push(sid);
                    $scope.chosen='';
                    break;
                }
            }
            if ($scope.chosen !== '') {
                var sid2 = {name: $scope.chosen};
                var idx2= $scope.chosenSpots.indexOf(sid2);
                if (idx2 < 0) $scope.chosenSpots.push(sid2);
                $scope.chosen= '';
            }
        };

        $scope.deleteSpot= function (spot) {
            console.log(spot);
            var idx= $scope.chosenSpots.indexOf(spot);
            $scope.chosenSpots.splice(idx, 1);
        };

        $scope.upload = function () {
            var team= $scope.rider;
            teamMemberFactory.uploadTeamMember(team.sport, team.name, team.alias, team.photo_url, team.procedence,
                team.residence, team.birthdate, team.stance, team.chosenSpots, team.quote, team.description,
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