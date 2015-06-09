"use strict";
import _ from 'lodash';
import faceModule from '../module';
import template from './template.html!text';
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