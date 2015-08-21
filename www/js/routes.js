angular.module('starter.routes', ['ionic','starter.constants'])


.config(function($stateProvider, $urlRouterProvider, USER_ROLES){
	

	$urlRouterProvider.otherwise(function($injector, $location){
		var $state = $injector.get($state);
		$state.go('main.dash');
	});

	//$urlRouterProvider.otherwise('main/dash');
	
	$stateProvider
		.state('login', {
			url : '/login',
			templateUrl : 'templates/login.html',
			controller : 'LoginCtrl'
		})

		.state('main',{
			url : '/',
			abstract : true,
			templateUrl : 'templates/main.html' 
		})
		.state('main.dash', {
			url : 'main/dash',
			views : {
				'dashboard-view' : {
					templateUrl : 'templates/dashboard.html',
					controller : 'DashCtrl'
				}
			}
		})

		.state('main.admin', {
			url : 'main/admin',
			views : {
				'admin-view' : {
					templateUrl : 'templates/admin.html',

				}
			},
			data : {
				authorizedRoles: [USER_ROLES.admin]
			}
		})
		.state('main.public',{
			url : '/main/public',
			views : {
				'public-view' :  {
					templateUrl : 'templates/public.html',

				}
			}
		});
})