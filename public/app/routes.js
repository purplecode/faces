'use strict';
import quizTemplate from './quiz/template.html!text';
import appModule from './appModule';
import 'angular-ui-router';
import './appController';

appModule.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider.state('quizController', {
    url: '/quiz',
    template: quizTemplate
  });

  $urlRouterProvider.otherwise('/quiz');
});
