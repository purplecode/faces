'use strict';
import './routes';
import './utils';
import angular from 'angular';
import appModule from './appModule';

var app = angular.module('app', [
  appModule.name
]);

appModule.config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      "default": 'monsterid'
    };
  }
]);

angular.element(document).ready(function () {
  angular.bootstrap(document, [app.name]);
});

export default app;