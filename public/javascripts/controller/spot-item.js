app.controller('SpotItemController',
    function ($scope, spotsFactory, eventService, $sce, $routeParams, $window, $location, $sce) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            ContactPage.initMap();
            OwlRecentWorks.initOwlRecentWorksV1();
        });

        $scope.getSpot = function(){
            spotsFactory.get({"id": $routeParams.spot}, function(spot){
                $scope.spot = spot;
                $scope.initMap();
                $scope.initPanorama();
            });

        };

        $scope.getSpot();

        $scope.getSpotUrl = function(spot){
            return $sce.trustAsResourceUrl(spot.url);
        };

        //Basic Map
        $scope.initMap = function () {

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

        //Panorama Map
        $scope.initPanorama = function () {
            var panorama = GMaps.createPanorama({
                el: '#panorama',
                lat: $scope.spot.latitude,
                lng: $scope.spot.longitude
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
