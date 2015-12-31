app.controller('GalleryController',
    function ($scope, homeFactory, eventService) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });
    }
);