'use strict';
import angular from 'angular';
import appModule from './appModule';

var app = angular.module('app', [
  appModule.name
]);

angular.element(document).ready(function () {
  angular.bootstrap(document, [app.name]);
});

export default app;