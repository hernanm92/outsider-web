app.controller('PostController',
    function ($scope, spotsFactory, teamsFactory, blogFactory, uploadFactory, $routeParams) {


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
                $scope.editId = post.id;
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
            uploadFactory.upload($scope.post.url, function (res) { console.log('uploaded'); });
            if ($scope.editId) blogFactory.update({id: $scope.editId}, $scope.post, callbackPost, errorPost);
            else {
                $scope.post.type= 'image';
                blogFactory.save($scope.post, callbackPost, errorPost);
                $scope.post.date = new Date();
            }
        };
    }
);

function callbackPost(res) {
    window.location = '#/admin/posts';
}

function errorPost(res) {
    console.log('saving post failed');
}
app.controller('AdminPostsController',
    function ($scope, blogFactory) {


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
            blogFactory.delete({id: id});
            for (var i = 0; i < $scope.posts.length; i++) {
                var post = $scope.posts[i];
                if (post.id === id) {
                    $scope.posts.splice(i, 1);
                    break;
                }
            }
        }

    }
);