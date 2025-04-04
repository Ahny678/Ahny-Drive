var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.Auther, indexController.Adrive);
router.get("/file/:fileId/open", indexController.openFile);
router.get("/:userId/:folderId", indexController.getAllFilesInFolder);

router.post("/:fileId/delete", indexController.deleteFile);
router.post(
  "/:userId/:folderId/deleteFiles",
  indexController.deleteAllFilesInFolder
);

router.post("/:userId/:folderId/delete", indexController.deleteFolder);
module.exports = router;
