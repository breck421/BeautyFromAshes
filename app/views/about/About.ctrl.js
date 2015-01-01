'use strict';

BFA.controller('AboutCtrl', ['$scope',
    function($scope) {
        var self = this;

        this.init = function() {
            this.setScope();
            this.load();
        };

        this.load = function() {
            this.setScopeEvents();
        };

        this.setScope = function() {
            $scope.md = '_content/about.md';
        };

        this.setScopeEvents = function() {
        };

        this.init();
    }]);
