const uploadController = require("../controllers/uploadController");
var express = require("express");
var router = express.Router();

router.get("/:userId/upload", uploadController.getNewFile);
router.post("/:userId/upload", uploadController.postNewFile);
router.get("/:userId/newFolder", uploadController.getNewFolder);
router.post("/:userId/newFolder", uploadController.postNewFolder);

module.exports = router;
