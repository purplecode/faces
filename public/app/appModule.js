'use strict';
import angular from 'angular';
import quizModule from './quiz/index';

export default angular.module('faces', [
  'ui.router',
  quizModule.name
]);