require(['$', 'angular', 'controllers', 'services', 'directives'],

function($, angular, controllers, services, directives) {
	"use strict";
	
     angular.element(document).ready(function () {

		var routing = function($routeProvider) {
			$routeProvider.
        when('/face', {
          templateUrl: 'template/face',
          controller: controllers.FaceController
        }).
        otherwise({redirectTo: '/face'});
		};

    var interpolateProvider = function ($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    };

		var app = angular.module('main', []);

    app.config(['$routeProvider', routing]);
    app.config(['$interpolateProvider', interpolateProvider]);

		app.factory('Faces', services.Faces);
    app.factory('GuessModes', services.GuessModes);

    app.directive('focusOn', directives.focusOn);

    angular.bootstrap(document , ['main']);
  });
});