const express = require("express");
const passport = require("passport");
const router = express.Router();
const homeCon = require("../controllers/homeController");
router.use("/users", require("./user"));
router.get("/", passport.checkAuthentication, homeCon.home);

module.exports = router;
