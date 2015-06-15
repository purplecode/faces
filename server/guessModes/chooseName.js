var _ = require('lodash');
var Logs = require('../database/Logs');
var Faces = require('../database/Faces');

var getFullname = function(face) {
  return face.forename + " " + face.surname;
};

exports.questionData = function(originalFace, query, callback) {
  var face = _.omit(originalFace.toObject(), 'forename', 'surname', 'photos');
  Faces.getRandom(3, query).then(function(faces){
    var namesToChoose = [originalFace].concat(faces).map(getFullname);
    callback('chooseName', face, _.shuffle(namesToChoose));
  });
};

exports.guess = function(face, input, callback) {

    var isOk = getFullname(face) === input.answer;
    Logs.log(face._id, input.answer, isOk);
    
    if (isOk) {
      callback({
        status: 'correct',
        face: face,
        answer: input.answer
      });
    } else {
      callback({
        status: 'wrong',
        face: face,
        answer: input.answer
      });  
    }

};