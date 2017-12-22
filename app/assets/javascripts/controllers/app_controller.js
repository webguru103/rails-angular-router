angular.module('an-app').controller('AppController', ['AuthService', 'Session', '$router', function AppController (AuthService, Session, $router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/sample', component: 'sample' },
    {path: '/detail/:id', component: 'detail' }
  ]);

  AuthService.getCurrentUser()
  .then(function(response) {
    this.rails_current_user = Session.userData;
  }.bind(this));

  this.logout = function () {
    AuthService.logout()
    .then(function(){
      this.rails_current_user = Session.userData;
    }.bind(this));
  };

  this.loginform = {};

  this.logUserIn = function() {
    var credentials = {
      username: this.loginform.username,
      password: this.loginform.password
    };
    AuthService.login(credentials)
    .then(function(){
      if (Session.userData) {
        this.rails_current_user = Session.userData;
        this.loginform = {};
      }
    }.bind(this));
  };
}]);
