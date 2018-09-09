var mongooseI18nErrors = new (require(backendApp.config.root + '/app/lib/express-restify-mongoose/lib/middleware/mongoose-i18n-errors.js'))();

module.exports = function (req, res) {
  res.badRequest = function (data) {
    mongooseI18nErrors.handler(data, req, res, function () {
      res.status(400).send(data);
    });
  };
};
