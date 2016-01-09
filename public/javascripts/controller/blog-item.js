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

        //Load Google Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-72174864-1', 'auto');
        ga('send', 'pageview');
    }
);