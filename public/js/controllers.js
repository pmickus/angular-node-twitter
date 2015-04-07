var appControllers = angular.module('appControllers', []);

appControllers.controller('TweetListController', function($scope, $window, Tweet) {
  $scope.tweets = Tweet.query();

  $scope.deleteTweet = function(tweet) { 
    tweet.$delete(function() {
      $window.location.reload();
    });
  };  
});

appControllers.controller('TweetShowController', function($scope, $routeParams, Tweet) {
  $scope.tweet = Tweet.get({id: $routeParams.id});
});

appControllers.controller('TweetEditController', function($scope, $routeParams, $location, Tweet) {
  $scope.tweet = Tweet.get({id: $routeParams.id});
  $scope.updateTweet = function() { 
    $scope.tweet.$update(function() {
      $location.path('/tweets/' + $routeParams.id);
    });
  };  
});

appControllers.controller('TweetCreateController', function($scope, $location, Tweet) {
  $scope.tweet = new Tweet();  
  $scope.addTweet = function() { 
    $scope.tweet.$save(function() {
      $location.path('/tweets');
    });
  };
});

appControllers.controller('UserShowController', function($scope, $routeParams, User) {
  $scope.user = User.get({id: $routeParams.id});
});


