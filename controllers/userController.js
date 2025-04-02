const multer = require("multer");
const uploadVideo = multer({
  dest: "/home/tiffany/repos/Ahny-Drive/public/data/videos",
});

exports.uploadVid = [
  uploadVideo.single("video"),
  (req, res) => {
    try {
      if (req.file) {
        res.status(200).json({ messae: "File uploaded succesfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Bad request. pleasse upload a file" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  },
];
exports.getUpload = (req, res) => {
  res.render("upload");
};
