require(['$', 'angular', 'controllers', 'services'],

function($, angular, controllers, services) {
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

    	angular.bootstrap(document , ['main']);
  	});
});