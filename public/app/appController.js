'use strict';
import appModule from './appModule';
import './styles.css!';

appModule.controller('appController', function($scope, $state){

  $scope.applySearch = (search) => {
      $state.go('face');
  };

});