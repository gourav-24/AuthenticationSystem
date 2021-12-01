const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// use local strategy of passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // check if user exist
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user in passport js: ", err);
          return done(err);
        }
        // user not found
        if (!user) {
          console.log("user with email not found");
          return done(
            null,
            false,
            req.flash("error", `User email: ${email} not found.`)
          );
        }

        // user found now compare user given password and hex generated password
         user.comparePassword(password,function(matchError, isMatch) {
          if (matchError) {
            callback({error: true})
          } else if (!isMatch) {
            return done(null, false, req.flash("error", "Incorrect password"));
          } else {
            return done(null, user);
          }
        });
      });
    }
  )
);

// serialize user
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

//deserialize user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in deserializing user: ", err);
      return done(err);
    }
    return done(null, user);
  });
});

// check aythentication
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  }
  // if user is not signed in
  return res.redirect("/users/signin");
};

module.exports = passport;
