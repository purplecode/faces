var mongoose = require('mongoose');

var Database = {};

Database.connect = function(database) {
	mongoose.connect('mongodb://localhost/' + database);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {});
};

module.exports = Database;
