app.controller('TeamItemController',
    function ($scope, teamsFactory, eventService, $location, $routeParams) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            OwlRecentWorks.initOwlRecentWorksV1();
        });

        $scope.getRider = function(){
            teamsFactory.get({"id": $routeParams.rider}, function(rider){
                $scope.rider = rider;
            });
        }

        $scope.getRider();

    }
);