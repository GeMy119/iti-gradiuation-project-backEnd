const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix + extname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB in Bytes
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(png|jpg|jpeg)$/; // Regular expression to check file extensions
    if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Please upload an image with a valid format (png, jpg, or jpeg)."));
    }
    cb(null, true);
  },
});

module.exports = upload;
