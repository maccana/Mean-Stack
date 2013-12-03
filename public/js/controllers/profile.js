angular.module('mean.profiles').controller('ProfilesController', ['$scope', '$routeParams', '$location', 'Global', 'Profiles', function ($scope, $routeParams, $location, Global, Profiles) {
    $scope.global = Global;

    $scope.create = function() {
        var profile = new Profiles({
            title: this.title,
            content: this.content
        });
        profile.$save(function(response) {
            $location.path("profiles/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(profile) {
        profile.$remove();  

        for (var i in $scope.profiles) {
            if ($scope.profiles[i] == profile) {
                $scope.profiles.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
        profile.updated.push(new Date().getTime());

        profile.$update(function() {
            $location.path('profiles/' + profile._id);
        });
    };

    $scope.find = function() {
        profiles.query(function(profiles) {
            $scope.profiles = profiles;
        });
    };

    $scope.findOne = function() {
        profiles.get({
            profileId: $routeParams.profileId
        }, function(profile) {
            $scope.profile = profile;
        });
    };
}]);