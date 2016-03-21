app.controller('GalleryController',
    function ($scope, galleryFactory, eventService, $location, $window) {

        $scope.$on('$viewContentLoaded', function(){ //Template javascript (JQuery must be in angular controllers)
            App.init();
        });

        $scope.getPhotos = function(){
            galleryFactory.query({},function(photos){
                $scope.photos=photos;
            });
        };

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

//forma que encontre para que ejecute este jquery cuando terminan de cargarse todas las fotos
app.directive('onFinishPhotosRender', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                element.ready(function () {
                    gridContainer = $('#grid-container');
                    filtersContainer = $('#filters-container');

                    /*********************************
                     init cubeportfolio
                     *********************************/
                    gridContainer.cubeportfolio({
                        layoutMode: 'grid',
                        rewindNav: true,
                        scrollByPage: false,
                        defaultFilter: '*',
                        animationType: 'slideLeft',
                        gapHorizontal: 20,
                        gapVertical: 20,
                        gridAdjustment: 'responsive',
                        mediaQueries: [{
                            width: 800,
                            cols: 3
                        }, {
                            width: 500,
                            cols: 2
                        }, {
                            width: 320,
                            cols: 1
                        }],
                        caption: 'zoom',
                        displayType: 'lazyLoading',
                        displayTypeSpeed: 100
                    });

                    /*********************************
                     add listener for filters
                     *********************************/
                    if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
                        wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');

                        wrap.on({
                            'mouseover.cbp': function() {
                                wrap.addClass('cbp-l-filters-dropdownWrap-open');
                            },
                            'mouseleave.cbp': function() {
                                wrap.removeClass('cbp-l-filters-dropdownWrap-open');
                            }
                        });

                        filtersCallback = function(me) {
                            wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
                            wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
                            me.addClass('cbp-filter-item-active');
                            wrap.trigger('mouseleave.cbp');
                        };
                    } else {
                        filtersCallback = function(me) {
                            me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
                        };
                    }

                    filtersContainer.on('click.cbp', '.cbp-filter-item', function() {
                        var me = $(this);

                        if (me.hasClass('cbp-filter-item-active')) {
                            return;
                        }

                        // get cubeportfolio data and check if is still animating (reposition) the items.
                        if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
                            filtersCallback.call(null, me);
                        }

                        // filter the items
                        gridContainer.cubeportfolio('filter', me.data('filter'), function() {});
                    });

                    /*********************************
                     activate counter for filters
                     *********************************/
                    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'), function() {
                        // read from url and change filter active
                        var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
                            item;
                        if (match !== null) {
                            item = filtersContainer.find('.cbp-filter-item').filter('[data-filter="' + match[1] + '"]');
                            if (item.length) {
                                filtersCallback.call(null, item);
                            }
                        }
                    });
                });
            }
        }
    }
});