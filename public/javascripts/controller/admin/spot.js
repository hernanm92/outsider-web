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
            spotFactory.uploadSpot(spot.sports, spot.name, spot.address, latitude, longitude, function () {
                //go to where it has to
                window.location = '/';
            });
        }
    }
);