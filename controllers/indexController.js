const File = require("../models/file");
const Folder = require("../models/folder");

exports.Adrive = async (req, res) => {
  const loneFiles = await getAllLoneFiles(req);
  const folders = await getAllFolders(req);
  const toFront = {
    title: "Adrive",
    userId: req.user.id,
    loneFiles: loneFiles,
    folders: folders,
  };
  res.render("index", toFront);
};
const getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.findAll({ where: { userId: req.user.id } });
    return folders;
  } catch (err) {
    throw new Error("Error retrieving folders: " + err.message);
  }
};

const getAllLoneFiles = async (req) => {
  try {
    const files = await File.findAll({
      where: { userId: req.user.id, folderId: null },
    });
    return files;
  } catch (err) {
    throw new Error("Error retrieving files: " + err.message);
  }
};

exports.getAllFilesInFolder = async (req, res) => {
  const { userId, folderId } = req.params;
  const affiliatedFiles = await File.findAll({
    where: { folderId: folderId, userId: userId },
  });

  res.render("viewFolder", { files: affiliatedFiles, userId: userId });
};

exports.Auther = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to view this page" });
  }
};
