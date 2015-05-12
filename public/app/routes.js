'use strict';
import appModule from './appModule';
import 'angular-ui-router';
import './appController';

import quizTemplate from './quiz/template.html!text';

appModule.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider.state('quiz', {
    url: '/quiz',
    template: quizTemplate,
    controller: 'quizController'
  });

  $urlRouterProvider.otherwise('/quiz');
});
