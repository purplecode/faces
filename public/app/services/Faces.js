'use strict';
import _ from 'lodash';
import servicesModule from './module';

export default servicesModule.factory('Faces', ($http) => {

  return {
    getRandom: function() {
      return $http.get('faces/random');
    },

    checkName: function(face, mode, data) {
      data._id = face._id;
      data.mode = mode;
      return $http.post('faces/check', data);
    },

    getPopular: function() {
      return $http.get('faces/popular');
    }
  };
});