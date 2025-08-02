const uploadController = require("../controllers/uploadController");
var express = require("express");
var router = express.Router();

router.get("/upload/file/:userId/", uploadController.getNewFile);
router.get("/upload/folder/:userId/", uploadController.getNewFolder);
router.post("/upload/file/:userId/", uploadController.postNewFile);
router.post("/upload/folder/:userId/", uploadController.postNewFolder);

module.exports = router;
