var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.get("/login", userController.getLoginPage);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/signup",
    successRedirect: "/",
  })
);
router.get("/signup", userController.getSignupPage);
router.post("/signup", userController.postSignupPage);

router.get("/upload", userController.getUpload);
router.post("/upload", userController.uploadVid);

module.exports = router;
