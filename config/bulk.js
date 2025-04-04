require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Function to upload images
const uploadImages = async (folderPath) => {
  const imageFiles = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

  if (imageFiles.length === 0) {
    console.log("No images found in the folder.");
    return;
  }

  const uploadedUrls = [];

  for (const file of imageFiles) {
    try {
      const filePath = path.join(folderPath, file);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "seeders",
      });
      uploadedUrls.push(result.secure_url);
      console.log(`Uploaded: ${file} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error);
    }
  }

  // Save URLs to a file (optional)
  fs.writeFileSync("image_urls.json", JSON.stringify(uploadedUrls, null, 2));

  console.log("All images uploaded. URLs saved in image_urls.json");
};

// Call the function with your local images folder
uploadImages("cloudUploads"); // Change this to your actual folder path
