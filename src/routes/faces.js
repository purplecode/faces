var fs = require('fs');
var Faces = require('../database/Faces.js');

var getImg64 = function(file, callback) {
  fs.readFile(file, function(err, data) {
     callback(new Buffer(data).toString('base64'));
  });
};

exports.all = function(req, res){
  Faces.getAll(function(faces) {
    res.send(faces);
  });
};


var guessMode = require('../js/guessModes/inputName');

exports.random = function(req, res){
  var random = function(n) {
    return Math.floor(Math.random()*n);
  };
  
  Faces.getRandom(function(face) {
    var randomPhoto = face.photos[random(face.photos.length)];
    getImg64('public/images/faces/'+randomPhoto, function(img64) {
      guessMode.questionData(face, function(faceData){
        res.send({
          _id: face._id,
          photo: img64,
          face: faceData
        });
      });
    });
  });
};

exports.check = function(req, res){
  Faces.get(req.body._id, function(face){
    guessMode.guess(face, req.body, function(response){
      res.send(response);
    });
  });
};