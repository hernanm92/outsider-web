app.controller('SpotItemController',
    function ($scope, spotsFactory, eventService, $sce, $routeParams, $window, $location, $sce) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            OwlRecentWorks.initOwlRecentWorksV1();
        });

        $scope.getSpot = function(){
            spotsFactory.get({"id": $routeParams.spot}, function(spot){
                $scope.spot = spot;
                $scope.initMap(spot.latitude, spot.longitude);
                $scope.initPanorama(spot.latitude, spot.longitude);
            });

        };

        $scope.getSpot();

        $scope.getSpotUrl = function(spot){
            return $sce.trustAsResourceUrl(spot.url);
        };

        //Basic Map
        $scope.initMap = function (lat, long) {
            var map;
            $(document).ready(function(){
                console.log('entre algna vez?');
                map = new GMaps({
                    div: '#map',
                    scrollwheel: false,
                    lat: lat,
                    lng: long
                });

                var marker = map.addMarker({
                    lat: lat,
                    lng: long,
                    title: $scope.spot.name
                });
            });
        };

        //Panorama Map
        $scope.initPanorama = function (lat, long) {
            var panorama;
            $(document).ready(function(){
                panorama = GMaps.createPanorama({
                    el: '#panorama',
                    lat : lat,
                    lng : long
                });
            });
        };


        //Load Google Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-72174864-1', 'auto');
        //ga('send', 'pageview');

        $window.ga('send', 'pageview', {
            page: $location.path()
        });
    }
);
