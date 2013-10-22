define(['_'], function(_) {
 "use strict";

  var Faces = function($http) {
      return {
        
        getRandom: function() {
          return $http.get('faces/random');
        },

        checkName: function(face, data) {
          data._id = face._id;
          return $http.post('faces/check', data);
        }

      };
    };

  return Faces;
});