// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMockE2E', 'starter.controllers','starter.services', 'starter.routes', 'starter.constants'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function($httpBackend){
  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
  
  $httpBackend.whenGET('http://localhost:8100/valid')
              .respond({message: 'This is my valid response'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
              .respond(401, {message: 'Not Authenticated'});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
              .respond(403, {message: 'Not Authorized'});
})

.run(function($rootScope, $state, AuthService, AUTH_EVENTS){
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState){
    
    if('data' in next && 'authorizedRoles' in next.data){
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)){
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if(!AuthService.isAuthenticated()){
      if(next.name !== 'login'){
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})
