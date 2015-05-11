var fs = require('fs');
var q = require('q');

exports.getImgBase64 = function (file) {
  var readFile = q.denodeify(fs.readFile.bind(fs));
  return readFile(file).then(function(image) {
    return "data:image/gif;base64," + new Buffer(image).toString('base64');
  });
};