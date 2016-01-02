app.controller('BlogItemController',
    function ($scope, homeFactory, eventService, $sce) {

        $scope.$on('$viewContentLoaded', function(){
            App.init();
            LoginForm.initLoginForm();
            ContactForm.initContactForm();
        });

        $scope.comment = function() {
            console.log("plaaaa")
        }
    }
);