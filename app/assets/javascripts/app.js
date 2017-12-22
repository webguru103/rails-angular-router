angular.module('an-app', ['ngNewRouter', 'ngResource']);

//Tell angular to use the CSRF token rails provides on the page
angular.module('an-app').config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
});
