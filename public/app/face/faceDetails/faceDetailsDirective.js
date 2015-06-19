"use strict";
import _ from 'lodash';
import faceModule from '../module';
import template from './template.jade!';
import './styles.css!';

faceModule.directive('faceDetails', () => {

  let ddo = {
    restrict: 'E',
    template: template,
    scope: {
      face: '='
    }
  };
  return ddo;
});