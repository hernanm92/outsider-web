app.controller('SpotController',
    function ($scope, spotFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
            ContactPage.initMap();
            ContactPage.initPanorama();
            Datepicker.initDatepicker();
            Validation.initValidation();
            StyleSwitcher.initStyleSwitcher();
        });

        var spot= $scope;

        $scope.upload = function () {
            //todo: find a way to get latitude and logintude from address in order to show it later with gmaps and panoramic
            spot.address= document.getElementById('pac-input').value;
            spot.latitude= document.getElementById('lat').value;
            spot.longitude= document.getElementById('long').value;
            console.log(spot);
            spotFactory.uploadSpot(spot.sports, spot.name, spot.description, spot.address, spot.latitude, spot.longitude, spot.file, function (resp) {
                //go to where it has to
                window.location = '#/admin';
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
            //todo: edit
        };

        $scope.deleteSpot = function (id) {
            //todo: destroy
        }

    }
);