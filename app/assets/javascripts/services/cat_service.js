/*
  The {id: '@id'} means use the id of the passed object to make the url.
  The extra update method is needed because ngResource by default provides only
  .save which is a POST. Rails expects post for create and PUT/PATCH for update.
*/
angular.module('an-app').factory('CatService', function($resource) {
  return $resource('/cats/:id', {id: '@id'},
    {
      'update': { method:'PUT' }
    }
  );
});
