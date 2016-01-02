app.controller('BlogController',
    function ($scope, homeFactory, eventService, $sce) {

        $scope.posts = [
            {url: 'img/blog/img1.jpg', label: 'skate1', type: 'image'},
            {url: 'img/blog/img2.jpg', label: 'longboard2', type: 'image'},
            {url: '//player.vimeo.com/video/113463529?title=0&byline=0&portrait=0', label: 'surf3', type: 'video'},
            {url: 'img/blog/img2.jpg', label: 'longboard4', type: 'image'},
            {url: 'img/blog/img1.jpg', label: 'skate5', type: 'image'}
        ]

        $scope.getPostUrl = function(post){
            return $sce.trustAsResourceUrl(post.url);
        }



        $scope.$on('$viewContentLoaded', function(){

        });
    }
);