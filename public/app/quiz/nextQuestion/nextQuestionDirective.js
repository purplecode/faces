"use strict";
import _ from 'lodash';
import quizModule from '../module';
import template from './template.html!text';

quizModule.directive('nextQuestion', () => {

  let ddo = {
    restrict: 'E',
    template: template,
    scope: {
      isFinished: '=',
      action: '&',
      timeout: '='
    }
  };
  return ddo;
});