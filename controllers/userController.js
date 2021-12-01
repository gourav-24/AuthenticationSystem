const User = require("../models/user");
const customMWare = require("../configueration/middleware");

// render sign up page
module.exports.SignUp = function (req, res) {
  try {
    return res.render("SignUp");
  } catch (err) {
    console.log("error in signup controller ", err);
  }
};

// render sign in page
module.exports.SignIn = function (req, res, next) {
  try {
    customMWare.setFlash(req, res, next);
    return res.render("SignIn");
  } catch (err) {
    console.log("error in signin controller ", err);
  }
};

// create user controller
module.exports.createUser = async function (req, res) {
  try {
    console.log(req.body);
    if (req.body && req.body.email != null) {
      // check if the user with email exists
      let userFetched = await User.findOne({ email: req.body.email });
      if (!userFetched) {
        if (req.body.password !== req.body.conformPassword) {
          console.log("password doesnt match");
          return;
        }
        // user not found now create user
        await User.create(req.body, function (err, user) {
          if (err) {
            console.log("Error while creating user", err);
            return;
          }
        });
        return res.send({ userFound: false });
      }
      return res.send({ userFound: true, email: req.body.email });
    }

    return res.redirect("/users/signup");
  } catch (err) {
    console.log("error in createUser controller", err);
  }
};

// create session for user after credentials are verified
module.exports.createSession = function (req, res, next) {
  try {
    req.flash("success", "logged in successfully");
    
    return res.redirect("/");
  } catch (err) {
    console.log("error in createSession controller", err);
  }
};

// destroy the user session or log out 
module.exports.destroySession = function (req, res) {
  try {
    req.logOut();
    req.flash("success", "Logged out successfully");
    return res.redirect("/users/Signin");
  } catch (err) {
    console.log("error in destroy session controller", err);
  }
};
