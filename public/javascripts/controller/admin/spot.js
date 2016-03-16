app.controller('SpotController',
    function ($scope, spotFactory, spotsFactory, $routeParams, eventService) {


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
            console.log($scope.spot.latitude);
            console.log($scope.spot.longitude);

            map = new GMaps({
                div: '#map',
                scrollwheel: false,
                lat: $scope.spot.latitude,
                lng: $scope.spot.longitude
            });

            var marker = map.addMarker({
                lat: $scope.spot.latitude,
                lng: $scope.spot.longitude,
                title: $scope.spot.name
            });
        };

        $scope.autocompleteChange = function () {
            console.log('details  '+$scope.details);
            if ($scope.details != undefined && $scope.details.geometry != undefined && $scope.details.geometry.location != undefined) {
                console.log('entre');
                console.log($scope.details.geometry.location);
                var location = JSON.parse($scope.details.geometry.location.toString());
                console.log(location);
                console.log(location.lat);
                $scope.spot.latitude = $scope.details.geometry.location.lat;
                $scope.spot.longitude= $scope.details.geometry.location.lng;
                $scope.updateMap();
            }
        };
        if ($routeParams.spot != undefined) $scope.getSpot();

        $scope.upload = function () {
            var spot= $scope.spot;
            spotFactory.uploadSpot(spot.sports, spot.name, spot.description, spot.address, spot.latitude, spot.longitude, spot.url, function (resp) {
                //go to where it has to
                window.location = '#/admin/spots';
                //console.log(spot);
            });
        }
    }
);
app.controller('AdminSpotsController',
    function ($scope, spotsFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });

        var spots= $scope;

        $scope.getSpots = function () {
            spotsFactory.query({},function(spotss){
                $scope.spots=spotss;
            });
        };
        $scope.getSpots();

        $scope.editSpot = function (id) {
            window.location= '#admin/spot/'+id;
        };

        $scope.deleteSpot = function (id) {
            //todo: destroy
        }

    }
);