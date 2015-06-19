'use strict';
import appModule from './appModule';
import './appController';

import quizTemplate from './quiz/template.jade!';
import faceTemplate from './face/template.jade!';

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
