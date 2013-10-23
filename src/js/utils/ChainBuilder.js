
var _ = require('underscore');

var ChainBuilder = function ChainBuilderConstruct() {
	this.functions = [];
	this.callbacks = [];	
}

ChainBuilder.prototype = {

	functions: null,
	callbacks: null,

	addFunction: function(f, n) {
		n = n || 1
		_(n).times(function(){ 
    		this.functions.push(f);
  		}, this);
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
