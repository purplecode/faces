var mongoose = require('mongoose');

var faceSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    forename: String,
    surname: String,
    photos: Array,
    title: String,
    phoneNumber: String,
    skills: String,
    projects: String,
    website: String,
    about: String
});

module.exports = mongoose.model('Face', faceSchema);