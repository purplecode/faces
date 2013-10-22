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


exports.findMostFrequentCorrectAnswers = function(startDate, limit, callback) {
  LogEntry.aggregate(
  {
    $match: {
      date: {
        $gte: startDate
      },
      isOk: true
    }
  },
  {
    $group: {
      _id: '$faceId',
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      'count': -1
    }
  },
  {
    $limit: limit
  }, function(err, res){
    callback(res);
  });
};