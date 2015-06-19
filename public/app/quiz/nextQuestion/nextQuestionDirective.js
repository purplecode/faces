"use strict";
import _ from 'lodash';
import quizModule from '../module';
import template from './template.jade!';

quizModule.directive('nextQuestion', () => {

  let ddo = {
    restrict: 'E',
    template: template,
    scope: {
      isFinished: '=',
      action: '&',
      timeout: '=',
      status: '='
    }
  };
  return ddo;
});