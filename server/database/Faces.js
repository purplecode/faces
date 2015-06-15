var q = require('q');
var Face = require('./entities/Face.js');
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');


var getRandomFace = function (query) {
  query = query || {};
  query['photos.0'] = {'$exists' : true};
  var count = q.denodeify(Face.count.bind(Face));
  return count(query).then(function (countOfDocuments) {
    if (!countOfDocuments) {
      return q.reject("Couldn't find any faces in collection.");
    }
    var shift = Math.floor(Math.random() * countOfDocuments);
    return Face.find(query).skip(shift).limit(1).exec().then(function (documents) {
      return documents[0];
    });
  });
};

var Faces = {};

Faces.getRandom = function (howMany, query) {
  var promises = _.times(howMany || 1, function () {
    return getRandomFace(query)
  });
  return q.all(promises);
};

Faces.get = function (id) {
  var query = Face.find({_id: new ObjectID(id)});
  var findOne = q.denodeify(query.findOne.bind(query));
  return findOne();
};

Faces.find = function (query, fields, sorting) {
  var find = Face.find(query, fields);
  if (sorting) {
    find.sort(sorting);
  }
  return find.exec();
};

Faces.distinct = function (field) {
  return q.denodeify(Face.collection.distinct.bind(Face.collection))(field);
};


Faces.getRandomPhotoPath = function (face) {
  return 'public/images/faces/' + face.photos[Math.floor(Math.random() * face.photos.length)];
};


module.exports = Faces;