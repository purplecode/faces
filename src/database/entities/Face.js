
var mongoose = require('mongoose');

var faceSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    forename: String,
    surname: String,
    photos: Array
});

module.exports = mongoose.model('Face', faceSchema);