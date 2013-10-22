var LogEntry = require('./entities/LogEntry');

exports.log = function(faceId, givenName, isOk, userId) {
  var e = new LogEntry({
    faceId: faceId,
    userId: userId,
    givenName: givenName,
    isOk: isOk
  });
  //don't wait for save to end (we don't care)
  e.save();
};