'use strict';
import _ from 'lodash';
import servicesModule from './module';

export default servicesModule.factory('GuessModes', ($http) => {

  var setModelForScope = function($scope, model) {
    _.each(model, function(value, key) {
      $scope[key] = value;
    });
  };

  var getFinalHint = function(status, yourAnswer) {
    if (status === 'partial') {
      return 'Almost correct. You wrote: ' + yourAnswer;
    } else if (status === 'wrong') {
      return 'Wrong. You wrote: ' + yourAnswer;
    }
    return '';
  };

  var ModesFactory = {

    inputName: function($scope) {
      var setModel = setModelForScope.bind(this, $scope);

      return {
        name: 'inputName',
        init: function() {
          setModel({
            status: 'next',
            guess: '',
            hint: '',
            trial: 1
          });
        },
        getSubmitData: function() {
          return {
            guess: $scope.guess,
            trial: $scope.trial
          };
        },
        isFinished: function(resp) {
          if(resp.status === 'wrong' && $scope.trial < 3) {
            setModel({
              hint: resp.hint,
              trial: $scope.trial+1
            });
            return false;
          }

          setModel({
            message: '',
            hint: getFinalHint(resp.status, $scope.guess),
          });
          return true;
        }
      };
    },

    chooseName: function($scope) {
      var setModel = setModelForScope.bind(this, $scope);

      return {
        name: 'chooseName',
        init: function(extraData) {
          setModel({
            hint: '',
            status: 'next',
            chooseNameOptions: extraData
          });
        },
        getSubmitData: function(name) {
          return {
            answer: name
          };
        },
        isFinished: function(resp) {
          setModel({
            hint: getFinalHint(resp.status, resp.answer),
          });
          return true;
        }
      };
    },

    choosePhoto: function($scope) {
      var setModel = setModelForScope.bind(this, $scope);

      return {
        name: 'choosePhoto',
        init: function(extraData) {
          setModel({
            status: 'next',
            choosePhotoOptions: extraData
          });
        },
        getSubmitData: function(photoId) {
          return {
            answer: photoId
          };
        },
        isFinished: function(resp) {
          return true;
        }
      };
    }

  };

  return {
    getMode: function(mode, $scope) {
      return ModesFactory[mode]($scope);
    }
  };
});