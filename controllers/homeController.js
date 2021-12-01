const customMWare = require("../configueration/middleware");
// render home page after user is authenticated 
module.exports.home = function (req, res, next) {
  try {
    customMWare.setFlash(req, res, next);
    return res.render("home");
  } catch (err) {
    console.log("error in home controller: ", err);
  }
};
