var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/upload", userController.getUpload);
router.post("/upload", userController.uploadVid);

module.exports = router;
