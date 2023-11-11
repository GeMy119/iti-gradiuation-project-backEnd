const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const path = require('path'); // Add this line
const config = require('../connectionDB/config');

// Configure Multer for image upload
const storage = multer.memoryStorage();
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

// Upload image middleware
const uploadImage = async (req, res) => {
  try {
    console.log(req.file)
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Upload image to Cloudinar
    const result = await cloudinary.uploader.upload(req.file.buffer)

    // Save link in MongoDB
    const newImage = new Image({
      cloudinaryUrl: result.secure_url,
      filename: result.original_filename,
    });

    await newImage.save();

    res.locals.image = newImage; // Pass the uploaded image data to the next middleware or route handler
    res.json({ message: 'Image uploaded and link saved successfully', image: res.locals.image });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = uploadImage;
