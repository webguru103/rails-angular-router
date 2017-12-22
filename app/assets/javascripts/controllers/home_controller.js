angular.module('an-app')
  .controller('HomeController', ['CatService', function (CatService) {
    this.name = 'I am the home controller';
    CatService.query(function(data){
      this.cats = data;
    }.bind(this));
  }]);
