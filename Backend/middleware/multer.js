import multer from "multer";

// Using diskStorage with a destination helps prevent some Cloudinary 'raw' upload issues
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

export default upload;