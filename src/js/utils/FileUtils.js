var fs = require('fs');

exports.getImgBase64 = function(file, callback) {
  fs.readFile(file, function(err, data) {
     callback("data:image/gif;base64,"+new Buffer(data).toString('base64'));
  });
};