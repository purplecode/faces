var pattern = "\\.htm(l)?$";

var middleware = function (req, res, next) {
  if (!req.path.match(pattern)) {
    return next();
  }
  var path = req.path.replace(/^[\\\/]/, '').replace(new RegExp(pattern), '');
  res.render(path);
};

module.exports = middleware;
