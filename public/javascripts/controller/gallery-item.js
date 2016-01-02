app.controller('GalleryItemController',
    function ($scope, homeFactory, eventService) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            OwlRecentWorks.initOwlRecentWorksV1();
        });
    }
);