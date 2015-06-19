'use strict';
import appModule from './appModule';
import './styles.css!';

appModule.controller('appController', function ($scope, $state, $localStorage, Faces) {

  $scope.applySearch = (search) => {
    $state.go('face');
  };

  $localStorage['cities'] = $localStorage['cities'] || {};

  $scope.storage = $localStorage['cities'];

  Faces.getDistinct('city').then((cities) => {
    $scope.cities = cities.map((city) => {
      let cityName = city.toLowerCase();
      $scope.storage[cityName] = $scope.storage[cityName] || {
          name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
          originalName: city,
          selected: true
        };
      return $scope.storage[cityName];
    });
  });

});