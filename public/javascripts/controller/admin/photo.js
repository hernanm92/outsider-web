app.controller('PhotoController',
    function ($scope, galleryFactory, spotsFactory, uploadFactory, teamsFactory, $routeParams) {



        $scope.getSpots = function () {
            spotsFactory.query({},function(spots){
                $scope.spots=spots;
            });
        };
        $scope.getSpots();

        $scope.chosenRiders= [];
        $scope.getRiders = function () {
            teamsFactory.query({},function(teams){
                $scope.riders=teams;
            });
        };

        $scope.getRiders();

        $scope.getPhoto = function () {
            galleryFactory.get({"id": $routeParams.photo}, function(photo){
                $scope.photo = photo;
                $scope.chosenRiders= photo.riders ? photo.riders : [];
            });
        };

        if ($routeParams.photo != undefined) {
            $scope.getPhoto();
        }

        $scope.riderChosen= function(){
            for (var i = 0; i < $scope.riders.length; i++) {
                var rid = $scope.riders[i];
                if ($scope.chosen == rid.name) {
                    var idx= $scope.chosenRiders.indexOf(rid);
                    if (idx < 0) $scope.chosenRiders.push(rid);
                    $scope.chosen='';
                    break;
                }
            }
            if ($scope.chosen !== '') {
                $scope.chosenRiders.push({name: $scope.chosen});
                $scope.chosen= '';
            }
        };

        $scope.deleteRider= function (rider) {
            console.log(rider);
            var idx= $scope.chosenRiders.indexOf(rider);
            $scope.chosenRiders.splice(idx, 1);
        };
        $scope.upload = function () {
            uploadFactory.upload($scope.photo.url, function (res) {
                console.log('uploaded');
            });
            $scope.photo.riders= $scope.chosenRiders;
            galleryFactory.save($scope.photo, function (resp) {
                    window.location= '#/admin/photos';
            }, function (resp) {
                console.log('failed saving photo');
            });
        };
    }
);
app.controller('AdminPhotosController',
    function ($scope, galleryFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });


        $scope.getPhotos = function () {
            galleryFactory.query({},function(dbPhotos){
                $scope.photos= dbPhotos;
            });
        };
        $scope.getPhotos();

        $scope.editPhoto= function (id) {
            window.location= '#admin/photo/'+id;
        };

        $scope.deletePhoto= function (id) {
            galleryFactory.delete({id: id});
            for (var i = 0; i < $scope.photos.length; i++) {
                var photo = $scope.photos[i];
                if (photo.id === id) {
                    $scope.photos.splice(i, 1);
                    break;
                }
            }
        }

    }
);