app.controller('HomeController',
    function ($scope, galleryFactory, blogFactory, eventService, $sce, $window, $location) {

      	$scope.$on('$viewContentLoaded', function(){
            App.init();
            ParallaxSlider.initParallaxSlider();
	  	});

        $scope.services = [
            {icon: 'users', title: 'Comunidad', description: 'Outsider es una comunidad para todos aquellos que comparten la pasión por los deportes extremos.'},
            {icon: 'shield', title: 'Marcas', description: 'Intentamos juntar a riders con diferentes marcas. Tambien les damos la oportunidad de sumarse a nuestro equipo.'},
            {icon: 'line-chart', title: 'Exposición', description: 'Subimos contenido de riders para que puedan mostrar su destreza hacia la comunidad.'}
        ];

        $scope.brands = [
            {name: '...', photo: 'assets/img/clients4/1.png'},
            {name: '...', photo: 'assets/img/clients4/2.png'},
            {name: '...', photo: 'assets/img/clients4/3.png'},
            {name: '...', photo: 'assets/img/clients4/4.png'},
            {name: '...', photo: 'assets/img/clients4/5.png'},
            {name: '...', photo: 'assets/img/clients4/6.png'},
            {name: '...', photo: 'assets/img/clients4/7.png'},
            {name: '...', photo: 'assets/img/clients4/8.png'},
            {name: '...', photo: 'assets/img/clients4/9.png'}
        ];

        $scope.getPhotos = function(){
            galleryFactory.query({},function(photos){
                $scope.photos=photos.slice(0, 4);
            });
        }

        $scope.getPhotos();

        $scope.getPosts = function(){
            blogFactory.query({},function(posts){
                $scope.posts=posts.slice(0, 4);
            });
        };

        $scope.getPosts();

        $scope.getPostUrl = function(post){
            return $sce.trustAsResourceUrl(post.url);
        };

        $scope.truncate = function(text){
            size = text.length
            if(size <= 120){
                return text
            }
            return text.slice(0,120) + '...'
        };

        $scope.openBrand = function(url){
            window.open(url, '_blank');
        };


        //Load Google Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-72174864-1', 'auto');
        //ga('send', 'pageview');

        $window.ga('send', 'pageview', {
            page: $location.path()
        });
    }
);

//todo: ver si se pueden mejorar los tiempos
app.directive('onFinishBrandsRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                element.ready(function () {
                    OwlCarousel.initOwlCarousel();
                });
            }
        }
    }
});
