app.controller('TeamMemberController',
    function ($scope, teamsFactory, uploadFactory, spotsFactory, $routeParams) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
            Masking.initMasking();
            Datepicker.initDatepicker();
            Validation.initValidation();
            StyleSwitcher.initStyleSwitcher();
        });
        $scope.chosenSpots= [];
        $scope.spots= [];

        $scope.getSpots = function () {
            spotsFactory.query({},function(spots){
                $scope.spots= spots ? spots : [];
            });
        };

        $scope.getSpots();

        $scope.getRider = function () {
            teamsFactory.get({"id": $routeParams.rider}, function(rider){
                $scope.rider = rider;
                $scope.chosenSpots = rider.spots ? rider.spots : [];
                $scope.editId= rider.alias;
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
            var idx= $scope.chosenSpots.indexOf(spot);
            $scope.chosenSpots.splice(idx, 1);
        };

        $scope.upload = function () {
            uploadFactory.upload($scope.rider.photo_url, function (res) { console.log('uploaded');});
            $scope.rider.spots= $scope.chosenSpots;
            if ($scope.editId) teamsFactory.update({id: $scope.editId}, $scope.rider, callbackRider, errorRider);
            else teamsFactory.save($scope.rider, callbackRider, errorRider);
        }
    }
);

function callbackRider(res) {
    window.location = '#/admin/riders';
}

function errorRider(res) {
    console.log('saving rider failed');
}
app.controller('AdminRidersController',
    function ($scope, teamsFactory) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });

        $scope.getRiders = function () {
            teamsFactory.query({},function(dbRiders){
                $scope.riders= dbRiders;
            });
        };
        $scope.getRiders();

        $scope.editRider = function (id) {
            window.location= '#admin/rider/'+id;
        };

        $scope.deleteRider = function (id) {
            teamsFactory.delete({id: id});
            for (var i = 0; i < $scope.riders.length; i++) {
                var rider = $scope.riders[i];
                if (rider.alias === id) {
                    $scope.riders.splice(i, 1);
                    break;
                }
            }
        }

    }
);