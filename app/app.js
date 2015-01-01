'use strict';

var BFA = angular.module('BFA', ['ui.router', 'yaru22.md']);

BFA.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "app/views/home/home.html",
                controller: 'HomeCtrl'
            }).state("about", {
                url: "/about",
                templateUrl: "app/views/about/about.html",
                controller: 'AboutCtrl'
            })
            .state("contact", {
                url: "/contact",
                templateUrl: "app/views/contact/contact.html",
                controller: 'ContactCtrl'
            })
            .state("posts", {
                url: "/posts",
                templateUrl: "app/views/posts/posts.html",
                controller: 'PostsCtrl'
            })
            .state("photos", {
                url: "/photos",
                templateUrl: "app/views/photos/photos.html",
                controller: 'PhotosCtrl'
            });

        $urlRouterProvider.otherwise("/");
    }]);


BFA.controller('AppCtrl', ['$scope', '$rootScope', '$state',
    function AppCtrl($scope, $rootScope, $state) {
        $scope.goTo = function(state) {
            console.info('state', state);

            if ($state.current.name.indexOf(state) === -1) {
                $state.go(state);
            }
        };
    }]);
