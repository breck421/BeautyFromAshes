'use strict';

var BFA = angular.module('BFA', [

]);

BFA.controller('AppController', ['$scope', '$rootScope', 'UserService',
	function AppController($scope, $rootScope, UserService) {
		UserService.decUsers();

		$rootScope.isLoggedIn = UserService.isLoggedIn();

		$scope.logout = function() {
			$rootScope.isLoggedIn = false;
			UserService.logout();
		};
	}]);

//  '$locationProvider',
//$stateProvider, $urlRouterProvider, $locationProvider,
BFA.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/components");

		$stateProvider
			.state('', {
				url: "/components",
				templateUrl: "js/views/components/components.html",
				controller: 'ComponentController'
			});
	}]);
