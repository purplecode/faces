'use strict';
import 'angular-ui-router';
import 'angular-material';
import 'angular-gravatar';
import 'angular-material-icons';
import 'angular-google-chart';
import 'ngStorage';
import angular from 'angular';
import quizModule from './quiz/index';
import faceModule from './face/index';
import statsModule from './stats/index';
import servicesModule from './services/index';

export default angular.module('faces', [
  'ui.router',
  'ngMaterial',
  'ui.gravatar',
  'ngStorage',
  'googlechart',
  'ngMdIcons',
  quizModule.name,
  faceModule.name,
  statsModule.name,
  servicesModule.name
]);

