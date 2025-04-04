const File = require("../models/file");
const Folder = require("../models/folder");
const { v4: uuidv4 } = require("uuid");

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

  res.render("viewFolder", { files: affiliatedFiles, folderId: folderId });
};

exports.openFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.render("openFile", { fileUrl: file.url, fileName: file.name });
  } catch (err) {
    res.status(500).json({ message: "Error opening file", error: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    if (fileId) {
      await File.destroy({ where: { id: fileId } });
      res.status(200).json({ message: "Successful file deletion" });
    } else {
      return res
        .status(400)
        .json({ message: "Bad request. No file id provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteAllFilesInFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    if (folderId) {
      await File.destroy({ where: { folderId: folderId } });
      res.status(200).json({ message: "Successful deletion of files" });
    } else {
      return res
        .status(400)
        .json({ message: "Bad request. No folder id provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    if (folderId) {
      await Folder.destroy({ where: { id: folderId } });
      res.status(200).json({ message: "Successful deletion of folder" });
    } else {
      return res
        .status(400)
        .json({ message: "Bad request. No folder id provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.shareFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { duration } = req.body;

    if (!folderId || !duration) {
      return res.status(400).json({ message: "Missing folderId or duration" });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getHours() + parseInt(duration));

    const shareId = uuidv4();
    await Folder.update({ shareId, expiresAt }, { where: { id: folderId } });
    res
      .status(200)
      .json({ link: `http://localhost:3000/Adrive/share/${shareId}` });
  } catch (err) {}
};

exports.viewSharedFolder = (req, res) => {
  try {
  } catch (err) {}
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
