app.controller('TeamsController',
    function ($scope, teamsFactory, eventService) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            //App.initParallaxBg();
        });

        $scope.getRiders = function(){
            teamsFactory.query({},function(riders){
                $scope.riders=riders;
            });
        }

        $scope.getRiders();
    }
);