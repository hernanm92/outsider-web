app.controller('PhotoController',
    function ($scope, $location, photoFactory, spotsFactory, teamsFactory, eventService) {

        var post= $scope;

        $scope.getSpots = function () {
            spotsFactory.query({},function(spots){
                $scope.spots=spots;
            });
        };
        $scope.getSpots();


        $scope.getRiders = function () {
            teamsFactory.query({},function(teams){
                $scope.riders=teams;
                $scope.chosenRiders = [];
            });
        };

        $scope.getRiders();

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
        };

        $scope.deleteRider= function (rider) {
            console.log(rider);
            var idx= $scope.chosenRiders.indexOf(rider);
            $scope.chosenRiders.splice(idx, 1);
        };

        $scope.upload = function () {
            photoFactory.uploadPhoto(post.sports, post.title, post.file, post.story, post.quote,
                post.chosenRiders, post.spot, function (resp) {
                    //go to where it has to
                    window.location= '/admin/photo';
            });
        };
    }
);