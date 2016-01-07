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
            spotFactory.uploadSpot(spot.photo, spot.description, function () {
                //go to where it has to
                window.location = '/';
            });
        }
    }
);