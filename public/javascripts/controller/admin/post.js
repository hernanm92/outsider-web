app.controller('PostController',
    function ($scope, postFactory, eventService) {

        var post= $scope;

        $scope.upload = function () {
            console.log(post.story);
            console.log(post.resource);
            postFactory.uploadPost(post.sport, post.resource, post.story, function () {
                //go to where it has to
                window.location = '/';
            });
        }
    }
);