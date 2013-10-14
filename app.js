
/**
 * Module dependencies.
 */

require("string_score");

var express = require('express');;
var http = require('http');
var path = require('path');
var stylus = require('stylus');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware({
	src: __dirname + '/src',
	dest: __dirname + '/public'
}));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
* Database
*/
var database = require('./src/database/Database.js');
database.connect('faces');

/**
* Routing
*/
var routes = require('./src/routes')

app.get('/', routes.index);
app.get('/template/*', routes.template);
app.get('/faces/random', routes.random);
app.post('/faces/check', routes.check);

/**
* Start
*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
