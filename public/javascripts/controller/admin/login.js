app.controller('LoginController',
    function ($scope, authFactory) {

        var auth= $scope;

        $scope.login = function () {
            authFactory.login(auth.user, auth.password, function (response) {
                if (response.data.message === "ok") window.location = '#/admin';
                else $scope.error= 'Error';
            }, function (response) {
                $scope.error= 'Error';
            });
        }
    }
);