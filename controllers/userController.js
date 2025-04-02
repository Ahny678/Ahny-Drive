const multer = require("multer");
const uploadVideo = multer({
  dest: "/home/tiffany/repos/Ahny-Drive/public/data/videos",
});
require("dotenv").config();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
//AUTHENTICATION----------------------------------------------------------------

//VALIDATION LOGIC
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "not a valid email format.";

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage(`Username ${lengthErr}`),
  body("email").trim().isEmail().withMessage(`Email is ${emailErr}`),

  body("password").isLength({ min: 5 }),
  body("confirm-password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password mismatch"),
];

//-------------------------------------------------------------------------------------
exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.Logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("You have been logged out");
  });
};

exports.getSignupPage = (req, res) => {
  res.render("signup");
};

exports.postSignupPage = [
  validateUser,
  async (req, res) => {
    try {
      //errors check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("signup", {
          errors: errors.array(),
        });
      }
      //----------
      const { firstName, lastName, username, email, password, adminCode } =
        req.body;

      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
      });
      res
        .status(201)
        .json({ message: `New user created succesfully`, user: newUser });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", err: err.message });
    }
  },
];

//------------------------------------------------------------------------------------
exports.uploadVid = [
  uploadVideo.single("video"),
  (req, res) => {
    try {
      if (req.file) {
        res.status(200).json({ messae: "File uploaded succesfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Bad request. pleasse upload a file" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  },
];
exports.getUpload = (req, res) => {
  res.render("upload");
};
