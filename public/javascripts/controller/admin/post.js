app.controller('PostController',
    function ($scope, postFactory, eventService) {

        var post= $scope;

        $scope.upload = function () {
            console.log(post.story);
            console.log(post);
            postFactory.uploadPost(post.sport, post.file, post.story, function (resp) {
                //go to where it has to
                window.location = '/';
            });
        };
    }
);