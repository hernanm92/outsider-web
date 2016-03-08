app.controller('TeamItemController',
    function ($scope, teamsFactory, eventService, $routeParams, $window, $location, $filter, $sce) {

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

        $scope.getSpots = function(spots){
            response = '';
            console.log(spots)
            console.log(spots[0])
            if(spots[0]){
                if(spots[0].id){
                    response += '<a href="#/spots/' + spots[0].id + '">' + spots[0].name + '</a>'
                }else{
                    response += '<p style="display: inline">' + spots[0].name + '</p>'
                }
            }
            if(spots[1]){
                if(spots[1].id){
                    response += ' y <a href="#/spots/' + spots[1].id + '">' + spots[1].name + '</a>'
                }else{
                    response += ' y <p style="display: inline">' + spots[1].name + '</p>'
                }
            }
            return $sce.trustAsHtml(response)
        }

        $scope.age = function(date){
            date = new Date(date).getTime();
            now = new Date().getTime();
            miliseconds = now - date;
            return (miliseconds/1000/60/60/24/365.256).toFixedDown(0)
        };

        Number.prototype.toFixedDown = function(digits) {
            var n = this - Math.pow(10, -digits)/2;
            n += n / Math.pow(2, 53); // added 1360765523: 17.56.toFixedDown(2) === "17.56"
            return n.toFixed(digits);
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