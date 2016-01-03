app.controller('TeamsController',
    function ($scope, teamsFactory, eventService) {

        /*$scope.riders = [
            {photo_url: 'img/teams/img1.png', sport: 'longboard', name: 'Damián Nehemias'},
            {photo_url: 'img/teams/img2.png', sport: 'longboard', name: 'Sebastián Muñoz'},
            {photo_url: 'img/teams/img3.png', sport: 'longboard', name: 'Thomas Duarte'},
            {photo_url: 'img/teams/img4.png', sport: 'longboard', name: 'Valentín Travis Spalla'}
        ]*/

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