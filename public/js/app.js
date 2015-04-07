var app = angular.module('app', ['ngResource', 'ngRoute', 'appControllers', 'appServices']);

app.config(function($routeProvider, $locationProvider) { 
  $routeProvider
     .when('/tweets', {
       templateUrl: 'partials/tweet-list.html',
       controller: 'TweetListController',
       title: 'Tweets'
     })
     .when('/tweets/new', {
       templateUrl: 'partials/tweet-add.html',
       controller: 'TweetCreateController',
       title: 'Tweet - New'
     })                            
     .when('/tweets/:id', {
       templateUrl: 'partials/tweet-show.html',
       controller: 'TweetShowController',
       title: 'Tweet'
     })
     .when('/tweets/:id/edit', {
       templateUrl: 'partials/tweet-edit.html',
       controller: 'TweetEditController',
       title: 'Tweet - Edit'
     })
     .when('/users/:id', {
        templateUrl: 'partials/user-show.html',
        controller: 'UserShowController',
        title: 'User'
     });
     $locationProvider.html5Mode(true);
});
app.run(['$rootScope', '$route', function($rootScope, $route) {
  $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute) {
   $rootScope.title = $route.current.title;
  });
}]);
