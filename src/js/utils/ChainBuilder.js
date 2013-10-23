
var _ = require('underscore');

var ChainBuilder = function ChainBuilderConstruct() {
	this.functions = [];
	this.callbacks = [];	
}

ChainBuilder.prototype = {

	functions: null,
	callbacks: null,

	addFunction: function(f) {
		this.functions.push(f);
	},

	addCallback: function(c) {
		this.callbacks.push(c);
	},

	exec: function() {

		var results = [];
		var functionsLeft = this.functions.length;

		var waitCallback = function(data) {
			functionsLeft--;
			results.push(data);
			if (functionsLeft === 0) {
				_.each(this.callbacks, function(callback) {
					callback(results);
				});
			}
		};	

		_.each(this.functions, function(f) {
			f(waitCallback.bind(this));
		}, this);
	}

};


module.exports = ChainBuilder;
