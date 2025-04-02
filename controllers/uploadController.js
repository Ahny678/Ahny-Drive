const upload = require("../config/cloud");
const File = require("../models/file");
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

      const uploadedFiles = req.files.map(async (file) => {
        const fileType = file.mimetype.startsWith("image/")
          ? "photo"
          : file.mimetype.startsWith("video/")
          ? "video"
          : "document";

        return await File.create({
          name: file.originalname,
          type: fileType,
          url: file.path,
          size: file.size,
          userId: req.user.id,
          folderId: req.body.folderId || null,
        });
      });

      await Promise.all(uploadedFiles);

      res.status(200).json({
        message: "Files uploaded successfully",
        files: req.files.map((file) => file.path),
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },
];
