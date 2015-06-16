'use strict';
import appModule from './appModule';
import './styles.css!';

appModule.controller('appController', function ($scope, $state, $sessionStorage, Faces) {

  $scope.applySearch = (search) => {
    if (search.length >= 3) {
      $state.go('face');
    }
  };

  $sessionStorage['cities'] = $sessionStorage['cities'] || {};

  $scope.storage = $sessionStorage['cities'];

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