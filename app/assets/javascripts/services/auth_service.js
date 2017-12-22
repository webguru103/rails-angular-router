angular.module('an-app').factory('AuthService', function(Session, $http) {
  var authService = {};

  authService.logout = function() {
    return $http.get('/logout')
    .then(function(response){
      Session.destroy();
    });
  };

  authService.login = function(credentials) {
    return $http.post('/session', credentials)
      .then(function(response){
        if (response.data.userId > 0) {
          Session.create(response.data);
        }
      })
      .catch(function(response){
        console.log('caught', response);
      });
  };

  authService.getCurrentUser = function() {
    return $http.get('/session')
    .then(function(response){
      if (response.data.userId > 0) {
        Session.create(response.data);
      } else {
        Session.destroy();
      }
    }.bind(this))
    .catch(function(response){
      console.log('caught', response);
    });
    ;
  };

  return authService;
});
