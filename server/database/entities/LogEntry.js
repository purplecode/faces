var mongoose = require('mongoose');

var logEntrySchema = mongoose.Schema({
  faceId: String,
  date: {
    type: Date,
    default: Date.now
  },
  givenName: String,
  isOk: Boolean
});

module.exports = mongoose.model('Log', logEntrySchema);