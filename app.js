var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jadeMiddleware = require('./server/utils/jadeMiddleware')

var app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use('/faces', express.static(path.join(__dirname, 'public')));
app.use(jadeMiddleware)

var database = require('./server/database/Database.js');
database.connect('faces');

var routes = require('./server/routes/index');
var facesRoutes = require('./server/routes/faces');
var statsRoutes = require('./server/routes/stats')

var router = express.Router();
router.use('/', routes);
router.get('/faces/all', facesRoutes.all);
router.post('/faces/random', facesRoutes.random);
router.post('/faces/check', facesRoutes.check);
router.post('/faces/find', facesRoutes.find);
router.get('/faces/distinct/:field', facesRoutes.distinct);
router.get('/faces/popular', statsRoutes.getMostRecognizable);

app.use('/faces', router);

app.get('/', function(req, res) {
  res.redirect('/faces');
});


module.exports = app;
