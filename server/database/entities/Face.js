var mongoose = require('mongoose');

var faceSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  "id": String,
  "login": String,
  "city": String,
  "address": String,
  "forename": String,
  "surname": String,
  "fullname": String,
  "mail": String,
  "team": String,
  "department": String,
  "managerName": String,
  "managerLogin": String,
  "title": String,
  "phone": String,
  "photos": Array
});

module.exports = mongoose.model('Face', faceSchema);
