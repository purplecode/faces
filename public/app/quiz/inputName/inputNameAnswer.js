"use strict";
import _ from 'lodash';
import 'angular-bootstrap';
import quizModule from '../module';
import template from './answer.html!text';

quizModule.directive('inputNameAnswer', () => {

  let ddo = {
    restrict: 'E',
    template: template,
    link: function (scope, element, attrs) {

    }
  };
  return ddo;
});