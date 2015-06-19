"use strict";
import _ from 'lodash';
import faceModule from './module';
import './styles.css!';

faceModule.controller('faceController', ($scope, $timeout, Faces) => {

  $scope.faces = [];

  $scope.selectFace = (face) => {
    $scope.selectedFace = face;
  };

  $scope.$watch('search', () => {

    if(!$scope.search || ($scope.search && $scope.search.length < 3)) return;

    let query1 = {
      $text: {
        $search: $scope.search
      }
    };

    let query2 = {
      $or : [
        {login: {$regex : $scope.search}},
        {surname: {$regex : $scope.search}},
        {fullname: {$regex : $scope.search}},
        {mail: {$regex : $scope.search}},
        {title: {$regex : $scope.search}}
      ]
    };

    let fields = {
      score: {
        $meta: "textScore"
      }
    };

    let sorting = {
      score: { $meta: "textScore" }
    };

    // TODO there is mongo 2.4.3 on production server :/
    //Faces.find(query1, fields, sorting).then((faces) => {
    //  if(!faces || faces.length == 0) {
        Faces.find(query2, fields, sorting).then((faces) => {
          $scope.faces = faces;
          $scope.selectedFace = faces[0];
        });
    //  } else {
    //    $scope.faces = faces;
    //    $scope.selectedFace = faces[0];
    //  }
    //});
  });

});
