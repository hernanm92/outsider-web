app.controller('LoginController',
    function ($scope, authFactory, eventService) {

        var auth= $scope;

        $scope.login = function () {
            authFactory.login(auth.user, auth.password, function () {
                //go to where it has to
                window.location = '#/admin';
            });
        }
    }
);