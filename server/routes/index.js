var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  fs.exists('public/app-prod.js', function(exists) {
    res.render('index', {isProduction: exists});
  });

});

module.exports = router;
