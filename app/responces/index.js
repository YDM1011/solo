module.exports = function (req, res, next) {
  require(__dirname + "/ok")(req, res);
  require(__dirname + "/notFound")(req, res);
  require(__dirname + "/serverError")(req, res);
  require(__dirname + "/forbidden")(req, res);
  // require(__dirname + "/badRequest")(req, res);
  next();

};
