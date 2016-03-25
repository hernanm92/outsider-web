app.controller('TeamMemberController',
    function ($scope, teamsFactory, spotsFactory, $routeParams, eventService) {


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
            teamsFactory.save($scope.rider, function () {
              window.location = '#/admin/riders';
              console.log("rider created")
            }, function (error) {
              console.log("rider creation fail")
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
            teamsFactory.query({},function(riders){
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
