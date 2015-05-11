var q = require('q');
var Face = require('./entities/Face.js');
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');


var getRandomDocument = function(){
  var count = q.denodeify(Face.count.bind(Face));
  return count({}).then(function(countOfDocuments) {
    if (!countOfDocuments) {
      return q.reject("Couldn't find any faces in collection.");
    }
    var shift = Math.floor(Math.random()*countOfDocuments);
    return Face.find().skip(shift).limit(1).exec().then(function(documents) {
      return documents[0];
    });
  });
};

var faces = {};

faces.getRandom = function(howMany){
  var promises = _.times(howMany || 1, function() {
    return getRandomDocument()
  });
  return q.all(promises);
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
  return 'public/images/faces/' + face.photos[Math.floor(Math.random() * face.photos.length)];
};


module.exports = faces;