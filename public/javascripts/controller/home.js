app.controller('HomeController',
    function ($scope, homeFactory, eventService) {

      	$scope.$on('$viewContentLoaded', function(){
	        App.init();
	        OwlCarousel.initOwlCarousel();
	        ParallaxSlider.initParallaxSlider();
	  	});
}
);
