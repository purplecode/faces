
/*
 * GET home page.
 */

var Faces = require('../database/Faces.js');

exports.template = function(req, res){
	var path = req.params;
  	res.render(path);
};

exports.index = function(req, res){
  	res.render('main', { appName: 'Faces'});
};

exports.random = function(req, res){
	Faces.getRandom(function(face) {
		var randomPhoto = face.photos[Math.floor(Math.random()*face.photos.length)];
  		res.send({
  			photo: randomPhoto,
  			_id: face._id
  		});
	});
};

exports.check = function(req, res){
    Faces.get(req.body._id, function(face) {
        res.send({
        result: 'partial',
        message: req.body.guess
        //message: 'Yes, this is ' + face.forename + ' ' + face.surname
      });
    });
};

exports.all = function(req, res){
  Faces.getAll(function(faces) {
    res.send(faces);
  });
};