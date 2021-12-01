const passport =require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// use google startegy for signing in using google
passport.use(new googleStrategy({
    clientID :"320529293420-ske0dc7gdhbqpbebi9emcstje94ccmcb.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"https://authentication-system-v1.herokuapp.com/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    // profile contains user info requested from google along with profile we have access and refresh token
    // check if user exist 
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in finding user in passport-google-oauth-2-strategy in config",err);
            return;
        }
        if(user){
            return done(null,user);
            
        }else{
            // if user dont exist create a new user with data fetched from google
            // set your own password
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("error in creting user in passport-google-oauth2-strategy");
                    return;
                }
                return done(null,user);


            });
        }
    });



}

));

module.exports = passport;