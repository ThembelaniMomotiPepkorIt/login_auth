angular.module('starter.controllers', ['ionic', 'starter.services', 'starter.constants' ])

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS){
	$scope.username = AuthService.username();

	$scope.$on(AUTH_EVENTS.notAuthorized, function(event){
		var alertPopup = $ionicPopup.alert({
			title: 'Unauthorized!',
			template : 'You are not allowed to access this resource.'
		});
	});

	$scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
		AuthService.logout();
		$state.go('login');
		var alertPopup = $ionicPopup.alert({
			title : 'Session Lost!',
			template : 'Sorry, You have to login again.'
		});
	});

	$scope.setCurrentUsername = function(name){
		$scope.username = name;
	};
})

.controller('LoginCtrl', function($scope, AuthService, $state, $ionicPopup){
	console.log('Login Controller');
	$scope.data = {};
	
	$scope.login = function(data){
		AuthService.login(data.username, data.password).then(function(authenticated){
		$state.go('main.dash', 
					   {},
					   {reload: true});

			$scope.setCurrentUsername(data.username);
			console.log('success login');
		},function(err){
				console.log('error login');
			var alertpopup = $ionicPopup.alert({
				title : 'Login Failed!',
				template : 'Please check your credentials!'
			});
		});
	};
})

.controller('DashCtrl', function($scope, AuthService, $state, $http){
	$scope.logout = function(){
		AuthService.logout();
		$state.go('login');
	}

	$scope.performValidRequest = function(){
		$http.get('http://localhost:8100/valid').then(
			function(result){
				$scope.response = result;
			});
	};

	$scope.performUnauthorizedRequest = function(){
		$http.get('http://localhost:8100/notauthorized').then(
			function(result){
				//
			}, function(err){
				$scope.response = err;
			});
	};

	$scope.performInvalidRequest = function(){
		$http.get('http://localhost:8100/notauthenticated').then(
			function(result){
				//
			}, function(err){
				$scope.response = err;
			});
	};
})