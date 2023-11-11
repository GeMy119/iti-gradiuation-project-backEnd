const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const path = require('path'); // Add this line
const config = require('../connectionDB/config');

// Configure Multer for image upload
const storage = multer.diskStorage({});
const uploadImage = multer({
  storage: storage,
  // limits: {
  //   fileSize: 5 * 1024 * 1024, // 5 MB in Bytes
  // },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(png|jpg|jpeg)$/; // Regular expression to check file extensions
    if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Please upload an image with a valid format (png, jpg, or jpeg)."));
    }
    cb(null, true);
  },
});
module.exports = uploadImage;
