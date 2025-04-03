var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.Auther, indexController.Adrive);
router.get("/:userId/:folderId", indexController.getAllFilesInFolder);

module.exports = router;
