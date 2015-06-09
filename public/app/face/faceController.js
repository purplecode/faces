"use strict";
import _ from 'lodash';
import faceModule from './module';
import './styles.css!';

faceModule.controller('faceController', ($scope, $timeout, Faces) => {

  $scope.faces = [];

  $scope.$watch('search', () => {
    let query = {
      $text: {
        $search: $scope.search
      }
    };

    let fields = {
      score: {
        $meta: "textScore"
      }
    };

    let sorting = {
      score: { $meta: "textScore" }
    };

    Faces.find(query, fields, sorting).then((faces) => {
      $scope.faces = faces;
    });
  });

});
