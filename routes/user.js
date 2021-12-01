const express = require("express");
const router = express.Router();
const userCon = require("../controllers/userController");
const passport = require("passport");

router.get("/signup", userCon.SignUp);
router.get("/signin", userCon.SignIn);
// authenticate a user using google and ask for profile and ema
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
// if user email exist with gmail google will hit the following call back to create a session 
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userCon.createSession);
router.post("/createUser", userCon.createUser);
router.post(
  "/createSession",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/users/signin",
  }),
  userCon.createSession
);
router.get("/logout", passport.checkAuthentication, userCon.destroySession);
module.exports = router;
