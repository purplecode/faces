var FileUtils = require('../utils/FileUtils');
var Faces = require('../database/Faces');

var getGuessMode = function(modeName) {
  return require('../guessModes/'+modeName);
};

exports.all = function(req, res){
  Faces.getAll().then(function(faces) {
    res.send(faces);
  });
};

exports.random = function(req, res){
  var random = function(n) {
    return Math.floor(Math.random()*n);
  };

  //var modes = ['chooseName', 'inputName', 'choosePhoto'];
  var modes = ['inputName'];

  var guessMode = getGuessMode(modes[random(modes.length)]);

  Faces.getRandom(1).done(function(documents) {
    var face = documents[0];
    var randomPhoto = Faces.getRandomPhotoPath(face);
    FileUtils.getImgBase64(randomPhoto).then(function(img64) {
      guessMode.questionData(face, function(mode, faceData, extraData){
        res.send({
          _id: face._id,
          photo: img64,
          mode: mode,
          face: faceData,
          extras: extraData
        });
      });
    });
  });
};

exports.check = function(req, res){
  Faces.get(req.body._id).then(function(face){
    var guessMode = getGuessMode(req.body.mode);
    guessMode.guess(face, req.body, function(response){
      res.send(response);
    });
  });
};