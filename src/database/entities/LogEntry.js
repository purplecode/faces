
var mongoose = require('mongoose');

var logEntrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    faceId: String,
    userId: String,
    date: {
      type: Date,
      default: Date.now
    },
    givenName: String,
    isOk: Boolean
});

module.exports = mongoose.model('Log', logEntrySchema);