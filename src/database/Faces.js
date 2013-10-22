var Face = require('./entities/Face.js');
var ObjectID = require('mongodb').ObjectID;

var faces = {};

faces.getRandom = function(howMany, callback){
  Face.count({}, function(err, count) {
      if (!count) {
        console.error("Couldn't find any faces in collection.");
        callback({});
      }
      var shift = Math.floor(Math.random()*count);
      var promise = Face.find().skip(shift).limit(howMany).exec();
      promise.addBack(function (err, docs) {
        callback(docs);
      });
  });
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


module.exports = faces;