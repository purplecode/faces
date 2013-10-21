define(['_'], function(_) {
 "use strict";

  var Faces = function($http) {
      return {
        
        getRandom: function() {
        	return $http.get('faces/random');
        },

        checkName: function(face, guess, trial) {
          	return $http.post('faces/check', {
        		_id: face._id,
        		guess: guess,
            trial: trial
        	});
        }

      };
    };

  return Faces;
});