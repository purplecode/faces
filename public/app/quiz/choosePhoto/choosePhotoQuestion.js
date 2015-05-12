"use strict";
import _ from 'lodash';
import 'angular-bootstrap';
import quizModule from '../module';
import template from './question.html!text';

quizModule.directive('choosePhotoQuestion', () => {

  let ddo = {
    restrict: 'E',
    template: template,
    link: function (scope, element, attrs) {

    }
  };
  return ddo;
});