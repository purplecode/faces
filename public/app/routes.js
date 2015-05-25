'use strict';
import appModule from './appModule';
import './appController';

import quizTemplate from './quiz/template.html!text';
import faceTemplate from './face/template.html!text';

appModule.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider.state('quiz', {
    url: '/quiz',
    template: quizTemplate,
    controller: 'quizController'
  });

  $stateProvider.state('face', {
    url: '/face',
    template: faceTemplate,
    controller: 'faceController'
  });

  $urlRouterProvider.otherwise('/quiz');
});
