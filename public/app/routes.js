'use strict';
import template from './template.html!text';
import appModule from './appModule';
import 'angular-ui-router';
import './appController';

appModule.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider.state('appController', {
    url: '/',
    template: template
  });

  $urlRouterProvider.otherwise('/');
});
