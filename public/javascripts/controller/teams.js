app.controller('TeamsController',
    function ($scope, homeFactory, eventService) {
        $scope.$on('$viewContentLoaded', function(){
            App.init();
            App.initParallaxBg();
        });
    }
);