'use strict';
import angular from 'angular';
import quizModule from './quiz/index';
import servicesModule from './services/index';

export default angular.module('faces', [
  'ui.router',
  quizModule.name,
  servicesModule.name
]);