angular.module('an-app').service('Session', function () {
  this.create = function (userData) {
    this.userData = userData;
  };
  this.destroy = function () {
    this.userData = null;
  };
});
