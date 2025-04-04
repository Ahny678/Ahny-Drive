const uploadController = require("../controllers/uploadController");
var express = require("express");
var router = express.Router();

router.get("/:userId/upload/get", uploadController.getNewFile);
router.get("/:userId/newFolder/get", uploadController.getNewFolder);
router.post("/:userId/upload", uploadController.postNewFile);

router.post("/:userId/newFolder", uploadController.postNewFolder);

module.exports = router;
