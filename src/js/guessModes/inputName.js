var _ = require('underscore');
var stringUtils = require('../utils/StringUtils.js');

exports.questionData = function(face, callback) {
  callback(_.omit(face, 'forename', 'surename'));
};

exports.guess = function(face, input, callback) {

    var match = function(face, text) {
      text = text.replace(/\s+/g, ' ').toLowerCase();
      text = stringUtils.latinize(text);
      console.log(text);
      var scoreA = (face.forename + ' ' + face.surname).toLowerCase().score(text);
      var scoreB = (face.surname + ' ' + face.forename).toLowerCase().score(text);
      return Math.max(scoreA, scoreB);
    };

    var createCorrectResponse = function(face) {
      return {
        status: 'correct',
        face: face
      };
    };

    var createPartialResponse = function(face) {
      return {
        status: 'partial',
        face: face
      };
    };

    var createWrongResponse = function(face, guess, trial) {

      var hintVersion = Math.random() < 0.3 ? 'forename' : 'surname';
      var responses = {
        1: {
          status: 'wrong',
          hint: 'No, ' + hintVersion + ' starts with "'+face[hintVersion][0]+'"'
        },
        2: {
          status: 'wrong',
          hint: 'Wrong, ' + hintVersion + ' is "'+face[hintVersion]+'"'
        },
        3: {
          status: 'wrong',
          face: face
        }
      };

      return responses[trial];
    };

    var score = match(face, input.guess || '');
    var response;
    if(score == 1.0) {
      response = createCorrectResponse(face);
    } else if(score > 0.7) {
      response = createPartialResponse(face);
    } else {
      response = createWrongResponse(face, input.guess, input.trial);
    }
    callback(response);
    
};