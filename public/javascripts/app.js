
var app = angular.module('MainApp', ['ngRoute', 'config', 'homeModule', 'galleryModule', 'teamsModule', 'blogModule']);

app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    /*$httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";*/
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'general/home', controller: 'HomeController'});
    $routeProvider.when('/galeria', {templateUrl: 'general/gallery', controller: 'GalleryController'});
    $routeProvider.when('/equipos', {templateUrl: 'general/teams', controller: 'TeamsController'});
    $routeProvider.when('/blog', {templateUrl: 'general/blog', controller: 'BlogController'});
    $routeProvider.when('/blog/articulo', {templateUrl: 'general/blog-item', controller: 'BlogItemController'});
    $routeProvider.when('/galeria/foto', {templateUrl: 'general/gallery-item', controller: 'GalleryItemController'});
    $routeProvider.when('/404', {templateUrl: 'partials/404', controller: '404Controller'});
    $routeProvider.otherwise({redirectTo: '/404'});
}]);

app.directive( 'elemReady', function( $parse ) {
    return {
        restrict: 'A',
        link: function( $scope, elem, attrs ) {
            elem.ready(function(){
                $scope.$apply(function(){
                    var func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
})