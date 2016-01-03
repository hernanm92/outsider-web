app.controller('BlogController',
    function ($scope, blogFactory, eventService, $sce) {

        $scope.$on('$viewContentLoaded', function(){

        });

        $scope.getPosts = function(){
            blogFactory.query({},function(posts){
                $scope.posts=posts;
            });
        }

        $scope.getPosts();

        $scope.getPostUrl = function(post){
            return $sce.trustAsResourceUrl(post.url);
        }
    }
);