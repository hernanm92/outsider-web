app.controller('PostController',
    function ($scope, postFactory, spotsFactory, teamsFactory, blogFactory, $routeParams, eventService) {


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

        $scope.getPost = function () {
            blogFactory.get({"id": $routeParams.post}, function(post){
                $scope.post = post;
                $scope.chosenRiders= post.riders ? post.riders : [];
            });
        };

        if ($routeParams.post != undefined) {
            $scope.getPost();
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
            if ($scope.chosen && $scope.chosen !== '') {
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
            var post= $scope.post;
            postFactory.uploadPost(post.sports, post.title, post.url, post.description, post.quote,
                $scope.chosenRiders, post.spot != undefined ? post.spot.name : '', function (resp) {
                    //go to where it has to
                    window.location= '#/admin/posts';
                });
        };
    }
);
app.controller('AdminPostsController',
    function ($scope, blogFactory, eventService) {


        $scope.$on('$viewContentLoaded', function(){
            App.init();
        });


        $scope.getPosts = function () {
            blogFactory.query({},function(postss){
                $scope.posts=postss;
            });
        };
        $scope.getPosts();

        $scope.editPost= function (id) {
            window.location= '#admin/post/'+id;
        };

        $scope.deletePost= function (id) {
            //todo: destroy
        }

    }
);