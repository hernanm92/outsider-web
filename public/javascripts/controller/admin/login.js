app.controller('LoginController',
    function ($scope, authFactory, eventService) {

        var auth= $scope;

        $scope.login = function () {
            console.log(auth.user);
            console.log(auth.password);
            authFactory.login(auth.user, auth.password, function () {
                //go to where it has to
                window.location = '#/admin';
            });
        }
    }
);