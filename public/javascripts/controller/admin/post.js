app.controller('PostController',
    function ($scope, postFactory, eventService) {

        var post= $scope;

        $scope.upload = function () {
            postFactory.uploadPost(post.sport, post.title, post.file, post.story, post.quote, function (resp) {
                //go to where it has to
                window.location = '/admin/post';
            });
        };
    }
);