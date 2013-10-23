var _ = require('underscore');
var Faces = require('../../database/Faces');
var stringUtils = require('../utils/StringUtils');
var FileUtils = require('../utils/FileUtils');
var crypto = require('crypto');

var getFullname = function(face) {
  return face.forename + " " + face.surname;
};

var waitForAllCallback = function(howMany, callback) {
  var results = [];
  return function(data) {
    howMany--;
    results.push(data);
    if (howMany === 0) {
      callback(results);
    }
  };
};

var hashId = function(id) {
  var hash = crypto.createHash('md5').update("Moja sul jest moja."+id+".pieprzu troche tez. Kardamon i pieprz.").digest("hex");
  return hash;
};

exports.questionData = function(originalFace, callback) {
  var face = _.omit(originalFace, 'photos', '_id');

  // Find some additional random names in database
  Faces.getRandom(3, function(faces) {
    var waitForAll = waitForAllCallback(4, function(results){
      callback('choosePhoto', face, _.shuffle(results));
    });
    //add callback to all faces
    [originalFace].concat(faces).forEach(function(f){
      var photo = Faces.getRandomPhotoPath(f);
      console.log("get:"+photo);
      FileUtils.getImgBase64(photo, function(data){
        //don't store id in plain form, hashit
        console.log("wait:"+photo);
        waitForAll({
          _id: hashId(f._id),
          photo: data
        });
      });
    });
  });
};

exports.guess = function(face, input, callback) {

    if (hashId(face._id) === input.answer) {
      callback({
        status: 'correct',
        face: face
      });
    } else {
      callback({
        status: 'wrong',
        face: face
      });  
    }

};