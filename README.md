## Demo app using AngularJS talking to Rails
This is a simple demo application that uses the new angularjs router [ngNewRouter](http://angular.github.io/router/getting-started) to configure client-side routes and components, and also uses [ngResource](https://docs.angularjs.org/api/ngResource/service/$resource) to talk to a simple rest-style API implemented in rails.

### To try this out
* Clone repo
* bundle install
* bundle exec rails server
* Point browser at http://localhost:3000


##Angular with rails - one way to work

###Short version
* Put the angular files in vendor/assets/javascripts and require them from the application.js manifest file
* Create a "components" folder under public. Your angular templates will live in here, in folders named by component.
* Implement your angular app module, services, controllers etc in the app/assets/javascripts folders. Use naming to control load order (require_tree goes alphabetically) or require each explicitly the manifest in place of require_tree

###Longer version - setup

In vendor/assets/javascripts, put files
* angular.js
* angular-resource.js
* router.es5.js 

Add 
```
//= require angular.js
//= require angular-resource.js
//= require router.es5.js
```

above ```require_tree .``` in application.js

In app/assets/javascripts create
* app.js - declare your module here e.g.
* controllers.js - controllers here (you could also declare controllers in multiple files of course.)
* services.js - declare services here

Example module with app controller for router configuration:
```
angular.module('an-app', ['ngNewRouter', 'ngResource']);
angular.module('an-app').controller('AppController', ['$router', AppController]);

function AppController ($router) {
  $router.config([
    {path: '/', component: 'home' },
    {path: '/detail', component: 'detail' }
  ]);
}
```

Example Service that talks to a REST-style api:
```
/*
  The {id: '@id'} means use the id of the passed object to make the url.
  The extra update method is needed because gnResource by default provides only
  .save which is a POST. Rails expects POST for create and PUT/PATCH for update.
*/
angular.module('an-app').factory('CatService', function($resource) {
  return $resource('/cats/:id', {id: '@id'},
    {
      'update': { method:'PUT' }
    }
  );
});
```


As far as rails is concerned you have only one page - in our case it's the index action in HomeController

In config/routes.rb put 
```root 'home#index'```

In app/views/home/index.html.erb add the part of the page which will serve as the angular application. 
```
<div ng-app="an-app" ng-controller="AppController as app">
  <div ng-viewport>
  </div>
</div>
```


Then to add angular routes/components you can add to the route declarations in app.js

So e.g. add
```
    {path: '/mything', component: 'jimbo' },
```
in the routing block. Then angular will expect there to be a **public/components/jimbo/jimbo.html** template file and it will try to construct a controller called **JimboController**. The contents of the template file will go into the ng-viewport div in the single page.

### Example new route
The changes to add a new component/route called "sample" are visible in this commit https://github.com/stevecass/angular-new-router/commit/2ef0088e231d5082f99e76c47184b4b125d32817

Steps:
* Update the router config with ```{path: '/sample', component: 'sample' },```
* Implement a controller called SampleController
* Create a template file called (from rails app root) public/components/sample/sample.html

### Tips / gotchas
* Data you set on your SampleController as this.jimbo is available in your template as {{sample.jimbo}}
* If you use callbacks in your controllers (you probably will), remember to bind "this" to them so that you are setting data on the right object (example below).

Always bind this:
```
CatService.get({id:$routeParams.id}, function(data){
  this.cat = data;
}.bind(this));
```
