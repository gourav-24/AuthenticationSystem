const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const db = require("./configueration/mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("./configueration/passportLocals");
const flash = require("connect-flash");
const customMWare = require("./configueration/middleware");
const passportGoogle = require("./configueration/passport-google-oauth-2-Strategy");

// use ejs as your view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// set static
app.use(express.static("./assets"));

// parser to fetch body
app.use(express.urlencoded({ extended: false }));

// setup session
app.use(
  session({
    name: "AuthenticationApplication",
    secret: "SecretToEncodeCookie",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

//tell app to use passport
app.use(passport.initialize());
// tell app to use session cookies
app.use(passport.session());
// use flash
app.use(flash());

// use custom middleware
//app.use(customMWare.setFlash);
//set authenticated user this method of passport is called everytime a req is made(in some renders too like(sign in))
//app.use(passport.setAuthenticatedUser);
// use routes index.js as middleware
app.use("/", require("./routes/index"));

// start the server on port
app.listen(PORT, function (err) {
  if (err) {
    console.log("Error while starting the server ", err);
    return;
  }
  console.log("Server is up and running at port: ", PORT);
});
