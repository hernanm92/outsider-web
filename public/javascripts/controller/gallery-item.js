app.controller('GalleryItemController',
    function ($scope, galleryFactory, eventService, $routeParams, $window, $location) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });

        $scope.getPhoto = function(){
            galleryFactory.get({"id": $routeParams.photo}, function(photo){
                $scope.photo = photo;
            });
        }

        $scope.getPhoto();

        $scope.getRecentPhotos = function(){
            galleryFactory.query({},function(recentPhotos){
                $scope.recentPhotos = recentPhotos.slice(0, 10);
            });
        }

        $scope.getRecentPhotos();


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


//forma que encontre para que ejecute este jquery cuando terminan de cargarse todas las fotos
app.directive('onFinishPhotosRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                element.ready(function () {
                    OwlRecentWorks.initOwlRecentWorksV1();
                });
            }
        }
    }
});