app.controller('TeamsController',
    function ($scope, homeFactory, eventService) {

        $scope.riders = [
            {photo_url: 'img/teams/img1.png', sport: 'longboard', name: 'Damián Nehemias'},
            {photo_url: 'img/teams/img2.png', sport: 'longboard', name: 'Sebastián Muñoz'},
            {photo_url: 'img/teams/img3.png', sport: 'longboard', name: 'Thomas Duarte'},
            {photo_url: 'img/teams/img4.png', sport: 'longboard', name: 'Valentín Travis Spalla'}
        ]

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            //App.initParallaxBg();
        });
    }
);