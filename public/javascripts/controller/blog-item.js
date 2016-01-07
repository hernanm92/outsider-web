app.controller('BlogItemController',
    function ($scope, blogFactory, eventService, $sce, $routeParams) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            LoginForm.initLoginForm();
            ContactForm.initContactForm();
        });

        $scope.getPost = function(){
            blogFactory.get({"id": $routeParams.post}, function(post){
                $scope.post = post;
            });
        }

        $scope.getPost();
    }
);