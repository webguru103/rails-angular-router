angular.module('an-app')
  .controller('DetailController', ['$routeParams', 'CatService', function ($routeParams, CatService) {

    CatService.get({id:$routeParams.id}, function(data){
      this.cat = data;
    }.bind(this));

    this.saveKitty = function() {
      CatService.update(this.cat, function(data){
        this.cat = data;
        jQuery('#single-kitty-detail').fadeIn(50).fadeOut(50).fadeIn(50);
      }.bind(this));
    };

}]);
