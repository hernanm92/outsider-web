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
                window.location = '/';
                //console.log(spot);
            });
        }
    }
);