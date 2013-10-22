
/*
 * GET home page.
 */

var settings = require('../../settings.js');

exports.template = function(req, res){
	var path = req.params;
  res.render(path);
};

exports.index = function(req, res){
  res.render('main', { appName: settings.appName});
};