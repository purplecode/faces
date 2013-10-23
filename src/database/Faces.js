var ChainBuilder = require('../js/utils/ChainBuilder');
var Face = require('./entities/Face.js');
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');


var getRandomDocument = function(callback){
  Face.count({}, function(err, count) {
      if (!count) {
        console.error("Couldn't find any faces in collection.");
        callback({});
      }
      var shift = Math.floor(Math.random()*count);
      var promise = Face.find().skip(shift).limit(1).exec();
      promise.addBack(function (err, docs) {
        callback(docs[0]);
      });
  });
};

var faces = {};

faces.getRandom = function(howMany, callback){
  var builder = new ChainBuilder();
  builder.addFunction(getRandomDocument, howMany); 
  builder.addCallback(callback);
  builder.exec();
};

faces.get = function(id, callback){
  var query = Face.find({_id: new ObjectID(id)});
  query.findOne(function (err, doc) {
      callback(doc);
  });
};


faces.getAll = function(callback){
	var promise = Face.find().exec();
	promise.addBack(function (err, docs) {
		callback(docs);
	});
};

faces.getRandomPhotoPath = function(face) {
  var randomPhoto = 'public/images/faces/' + face.photos[Math.floor(Math.random() * face.photos.length)];
  return randomPhoto;
};


module.exports = faces;