var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Tweet', function($resource) {
  return $resource('api/tweets/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  }); 
});

appServices.factory('User', function($resource) {
  return $resource('api/users/:id', { id: '@_id' });
});



