// set the messages on the locals of reponse
module.exports.setFlash = function (req, res, next) {
  res.locals.flash = {
    "success": req.flash("success"),
    "error": req.flash("error"),
  };

  next();
};
