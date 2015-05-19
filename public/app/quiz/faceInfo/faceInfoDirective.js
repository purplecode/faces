"use strict";
import _ from 'lodash';
import quizModule from '../module';
import template from './template.html!text';

quizModule.directive('faceInfo', () => {

  let ddo = {
    restrict: 'E',
    template: template,
    scope: {
      face: '='
    }
  };
  return ddo;
});