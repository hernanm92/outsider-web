
var app = angular.module('MainApp', ['ngRoute', 'ngFileUpload', 'config', 'homeModule', 'galleryModule',
    'teamsModule', 'spotsModule', 'blogModule', 'authModule', 'postModule', 'photoModule', 'spotModule', 'teamMemberModule']);

app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

    //$httpProvider.defaults.useXDomain = true;
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'general/home', controller: 'HomeController'});
    $routeProvider.when('/gallery', {templateUrl: 'general/gallery', controller: 'GalleryController'});
    $routeProvider.when('/teams', {templateUrl: 'general/teams', controller: 'TeamsController'});
    $routeProvider.when('/blog', {templateUrl: 'general/blog', controller: 'BlogController'});
    $routeProvider.when('/blog/:post', {templateUrl: 'general/blog-item', controller: 'BlogItemController'});
    $routeProvider.when('/spots', {templateUrl: 'general/spots', controller: 'SpotsController'});
    $routeProvider.when('/spots/:spot', {templateUrl: 'general/spot-item', controller: 'SpotItemController'});
    $routeProvider.when('/gallery/:photo', {templateUrl: 'general/gallery-item', controller: 'GalleryItemController'});
    $routeProvider.when('/404', {templateUrl: 'partials/404', controller: '404Controller'});
    $routeProvider.when('/teams/:rider', {templateUrl: 'general/team-item', controller: 'TeamItemController'});
    $routeProvider.when('/about-us', {templateUrl: 'general/about-us', controller: 'AboutUsController'});
    $routeProvider.when('/admin/login', {templateUrl: 'general/admin/login', controller: 'LoginController'});
    $routeProvider.when('/admin/post', {templateUrl: 'general/admin/post', controller: 'PostController'});
    $routeProvider.when('/admin/photo', {templateUrl: 'general/admin/photo', controller: 'PhotoController'});
    $routeProvider.when('/admin/spot', {templateUrl: 'general/admin/spot', controller: 'SpotController'});
    $routeProvider.when('/admin/team-member', {templateUrl: 'general/admin/team-member', controller: 'TeamMemberController'});
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
});

app.directive('googleAnalytics', function ( $location, $window ) {
    //Load Google Analytics (intentar hacerlo generico)
});

