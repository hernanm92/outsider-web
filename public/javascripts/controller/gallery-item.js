app.controller('GalleryItemController',
    function ($scope, galleryFactory, eventService, $routeParams) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            OwlRecentWorks.initOwlRecentWorksV1();
        });

        $scope.getPhoto = function(){
            galleryFactory.get({"id": $routeParams.photo}, function(photo){
                $scope.photo = photo;
            });
        }

        $scope.getPhoto();

    }
);