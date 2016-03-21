app.controller('SpotsController',
    function ($scope, spotsFactory, eventService, $window, $location) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            $scope.initMap();
            //App.initParallaxBg();
        });

        $scope.initMap = function () {
            $(document).ready(function(){
                $scope.map = new GMaps({
                    div: '#map',
                    scrollwheel: false,
                    lat: -34.6037345,
                    lng: -58.3837644,
                    zoom: 12
                });
            });
        };

        $scope.getSpots = function(){
            spotsFactory.query({},function(spots){
                $scope.spots= chunk(spots, 3);
                for (var i = 0; i < spots.length; i++) {
                    var spot = spots[i];
                    $scope.map.addMarker({
                        lat: spot.latitude,
                        lng: spot.longitude,
                        title: spot.name
                    });
                }
            });
        };

        $scope.getSpots();


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

function chunk (arr, len) {

    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

// Optionally, you can do the following to avoid cluttering the global namespace:
Array.chunk = chunk;