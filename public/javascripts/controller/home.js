app.controller('HomeController',
    function ($scope, galleryFactory, eventService, $window, $location) {

      	$scope.$on('$viewContentLoaded', function(){
	        App.init();
	        OwlCarousel.initOwlCarousel();
	        ParallaxSlider.initParallaxSlider();
	  	});

        $scope.services = [
            {icon: 'users', title: 'Comunidad', description: 'Outsider es una comunidad para todos aquellos que comparten la pasión por los deportes extremos.'},
            {icon: 'shield', title: 'Marcas', description: 'Intentamos juntar a riders con diferentes marcas. Tambien les damos la oportunidad de sumarse a nuestro equipo.'},
            {icon: 'line-chart', title: 'Exposición', description: 'Subimos contenido de riders para que puedan mostrar su destreza hacia la comunidad.'}
        ];


        $scope.getPhotos = function(){
            galleryFactory.query({},function(photos){
                $scope.photos=photos.slice(0, 4);
            });
        }

        $scope.getPhotos();


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
