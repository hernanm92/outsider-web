app.controller('TeamItemController',
    function ($scope, teamsFactory, eventService, $routeParams, $window, $location, $filter) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            OwlRecentWorks.initOwlRecentWorksV1();
        });

        $scope.getRider = function(){
            teamsFactory.get({"id": $routeParams.rider}, function(rider){
                $scope.rider = rider;
                //todo: go get photos where this rider appears.
            });
        };

        $scope.getRider();

        $scope.formatDate = function(date){
            return $filter('date')(date, 'MM/dd/yyyy', '-0300')
        };

        $scope.age = function(date){
            //now = new Date().toISOString();
            //utc_timestamp = now
            //console.log(utc_timestamp)
            //console.log(Date.now())
            date = new Date(date).getTime();
            now = new Date().getTime();
            return moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(date,"DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm:ss")
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