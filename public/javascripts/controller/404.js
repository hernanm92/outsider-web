app.controller('404Controller',
    function ($scope, homeFactory, eventService) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();

            $.backstretch([
                "assets/img/bg/2.jpg",
                "assets/img/bg/8.jpg",
            ], {
                fade: 1000,
                duration: 7000
            });
        });
    }
);