var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

router.post("/share/:folderId", indexController.shareFolder);
router.get("/share/:shareId", indexController.viewSharedFolder);
router.get("/file/:fileId/open", indexController.openFile);
router.post("/:folderId/delete", indexController.deleteFolder);
router.post("/:fileId/delete", indexController.deleteFile);
router.post("/:folderId/deleteFiles", indexController.deleteAllFilesInFolder);
router.get("/:userId/:folderId", indexController.getAllFilesInFolder);

router.get("/", indexController.Auther, indexController.Adrive);
module.exports = router;
