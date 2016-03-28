app.controller('SpotController',
    function ($scope, spotsFactory, uploadFactory, $routeParams, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
            ContactPage.initMap();
            ContactPage.initPanorama();
            Datepicker.initDatepicker();
            Validation.initValidation();
            StyleSwitcher.initStyleSwitcher();
            $scope.spot = {};
            $scope.spot.latitude= -34.6037345;
            $scope.spot.longitude= -58.3837591;
            $scope.updateMap();
        });

        $scope.getSpot = function () {
            spotsFactory.get({"id": $routeParams.spot}, function(spot){
                $scope.spot = spot;
            });
        };

        $scope.updateMap = function () {
            map = new GMaps({
                div: '#map',
                scrollwheel: false,
                lat: $scope.spot.latitude,
                lng: $scope.spot.longitude
            });

            map.addMarker({
                lat: $scope.spot.latitude,
                lng: $scope.spot.longitude,
                title: $scope.spot.name
            });
        };

        $scope.autocompleteChange = function () {
            if ($scope.details != undefined ) {
                $scope.spot.latitude = $scope.details.lat;
                $scope.spot.longitude= $scope.details.lng;
                $scope.spot.address= $scope.details.formattedAddress;
                $scope.updateMap();
            }
        };
        if ($routeParams.spot != undefined) $scope.getSpot();

        $scope.upload = function () {
            uploadFactory.upload($scope.spot.url, function (res) {
                console.log('uploaded');
            });
            spotsFactory.save($scope.spot, function (resp) {
                window.location = '#/admin/spots';
            }, function (res) {
                console.log('failed spot saving');
            });
        }
    }
);
app.controller('AdminSpotsController',
    function ($scope, spotsFactory) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });


        $scope.getSpots = function () {
            spotsFactory.query({},function(spotss){
                $scope.spots=spotss;
            });
        };
        $scope.getSpots();

        $scope.editSpot = function (alias) {
            window.location= '#admin/spot/'+alias;
        };

        $scope.deleteSpot = function (id) {
            spotsFactory.delete({id:id});
            for (var i = 0; i < $scope.spots.length; i++) {
                var spot = $scope.spots[i];
                if (spot.alias === id) {
                    $scope.spots.splice(i, 1);
                    break;
                }
            }
        }

    }
);