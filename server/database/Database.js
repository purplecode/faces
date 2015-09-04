var mongoose = require('mongoose');

var Database = {};

Database.connect = function(database) {
	mongoose.connect('mongodb://'+(process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost')+':27017/' + database);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {});
};

module.exports = Database;
