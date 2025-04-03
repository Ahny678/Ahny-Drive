const upload = require("../config/cloud");
const File = require("../models/file");
const Folder = require("../models/folder");
exports.getUpload = (req, res) => {
  const userId = req.user.id;
  res.render("upload", { userId: userId });
};
exports.postUpload = [
  upload.array("files"),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const fileNames = req.body.fileNames; // Get file names from the form
      const fileNamesArray = Array.isArray(fileNames) ? fileNames : [fileNames]; // Ensure it's an array

      if (fileNamesArray.length !== req.files.length) {
        return res
          .status(400)
          .json({ message: "Mismatch between files and names" });
      }

      // Store files with custom names
      const uploadedFiles = await Promise.all(
        req.files.map(async (file, index) => {
          const fileType = file.mimetype.startsWith("image/")
            ? "photo"
            : file.mimetype.startsWith("video/")
            ? "video"
            : "document";

          return await File.create({
            name: fileNamesArray[index], // Use the custom name provided by the user
            type: fileType,
            url: file.path,
            size: file.size,
            userId: req.user.id,
            folderId: req.body.folderId || null,
          });
        })
      );

      res
        .status(200)
        .json({ message: "Files uploaded successfully", files: uploadedFiles });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error uploading files", error: err.message });
    }
  },
];

exports.getNewFolder = (req, res) => {
  const userId = req.user.id;
  res.render("newFolder", { userId: userId });
};

exports.postNewFolder = async (req, res) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json({ message: "Bad request. Give an folder name" });
    } else {
      const folderName = req.body.name;
      await Folder.create({
        name: folderName,
        userId: req.user.id,
      });
      res.status(201).json({ message: `${folderName} created succesfully` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};
