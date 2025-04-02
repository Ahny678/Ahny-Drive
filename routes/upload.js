const uploadController = require("../controllers/uploadController");
var express = require("express");
var router = express.Router();

router.get("/:userId/upload", uploadController.getUpload);
router.post("/:userId/upload", uploadController.postUpload);

module.exports = router;
