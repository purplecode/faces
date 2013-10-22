define(['_'], function(_) {
 "use strict";


  var setModelForScope = function($scope, model) {
    _.each(model, function(value, key) {
      $scope[key] = value;
    });
  };

 var ModesFactory = {

  inputName: function($scope) {
    var setModel = setModelForScope.bind(this, $scope);

    var getFinalHint = function(status) {
      if (status === 'partial') {
        return 'Almost correct. You wrote: ' + $scope.guess;
      } else if (status === 'wrong') {
        return 'Wrong. You wrote: ' + $scope.guess;
      }
      return '';
    };

    return {
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
          hint: getFinalHint(resp.status),
        });
        return true;
      }
    };
  }
  
 };

  var GuessModes = function() {
      return {
        getMode: function(mode, $scope) {
          return ModesFactory[mode]($scope);
        }
      };
    };

  return GuessModes;
});