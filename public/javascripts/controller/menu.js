app.controller('MenuController', function ($scope, homeService, $controller, $location,  $timeout, $rootScope, eventService, config) {
    $scope.isNavActive = function(id) {
        return $location.path() == id
    };

});
