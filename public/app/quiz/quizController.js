"use strict";
import _ from 'lodash';
import quizModule from './module';
import './styles.css!';

var setModel = function (model, $scope) {
  _.each(model, function (value, key) {
    $scope[key] = value;
  });
};

var getQuery = function ($scope) {
  let cities = _.pluck(_.filter($scope.cities, 'selected'), 'originalName');
  var query = {};
  if (cities.length > 0) {
    query.city = {$in: _.pluck(_.filter($scope.cities, 'selected'), 'originalName')};
  }
  return query;
};

var init = function ($scope, Faces, GuessModes) {
  $scope.initing = true;
  Faces.getRandom(getQuery($scope)).success(function (face) {
    setModel({
      faceImg: face.photo,
      face: face.face,
      initing: false,
      guessMode: face.mode,
      isFinished: false
    }, $scope);

    // Initialize guessmode
    guessMode = GuessModes.getMode(face.mode, $scope);
    guessMode.init(face.extras);
  });
};

var guessMode = null;

quizModule.controller('quizController', ($scope, $timeout, Faces, GuessModes) => {

  var nextTimeout = function (count) {
    if (!$scope.isFinished || $scope.initing) {
      return;
    }
    $scope.nextTimeout = count;
    if (count === 0) {
      init($scope, Faces, GuessModes);
    } else {
      $timeout(function () {
        nextTimeout(count - 1);
      }, 1200);
    }
  };

  $scope.next = function () {
    if (!$scope.initing) {
      init($scope, Faces, GuessModes);
    }
  };

  $scope.next();

  $scope.submit = function (ev, data) {
    if (ev) {
      ev.preventDefault();
    }

    Faces.checkName($scope.face, guessMode.name, guessMode.getSubmitData(data)).success(function (resp) {
      setModel({
        status: resp.status
      }, $scope);

      if (guessMode.isFinished(resp)) {
        setModel({
          isFinished: true,
          face: resp.face
        }, $scope);
        nextTimeout(5);
      }
    });
    return false;
  };

  $scope.$on('keypress:13', () => {
    if ($scope.isFinished) {
      $scope.next();
    }
  });


});
