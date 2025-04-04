const upload = require("../config/cloud");
const File = require("../models/file");
const Folder = require("../models/folder");

exports.getNewFile = async (req, res) => {
  const userId = req.user.id;
  const folders = await Folder.findAll({ where: { userId: userId } });
  res.render("upload", { userId: userId, folders: folders });
};

exports.postNewFile = [
  upload.array("files"),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const { fileNames, folderId, newFolder } = req.body;
      const fileNamesArray = Array.isArray(fileNames) ? fileNames : [fileNames];

      if (fileNamesArray.length !== req.files.length) {
        return res
          .status(400)
          .json({ message: "Mismatch between files and names" });
      }

      let assignedFolderId = null;

      // If user entered a new folder name, create it
      if (newFolder) {
        const createdFolder = await Folder.create({
          name: newFolder,
          userId: req.user.id,
        });
        assignedFolderId = createdFolder.id;
      } else if (folderId !== null) {
        assignedFolderId = folderId;
      }

      // Store files with custom names and assigned folder
      const uploadedFiles = await Promise.all(
        req.files.map(async (file, index) => {
          const detectedType = file.mimetype.startsWith("image/")
            ? "photo"
            : file.mimetype.startsWith("video/")
            ? "video"
            : "document";

          return await File.create({
            name: fileNamesArray[index], // Use the custom name provided by the user
            type: detectedType,
            url: file.path,
            size: file.size,
            userId: req.user.id,
            folderId: assignedFolderId, // Assign the correct folder ID (or null)
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
