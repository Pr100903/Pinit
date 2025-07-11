const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Create folder once globally, not during upload
const dest = path.join(__dirname, "../public/uploads/profiles");
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|avif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest);  // ✅ Folder already exists now
  },
  filename: function (req, file, cb) {
    const userId = req.user?._id || "user";
    const ext = path.extname(file.originalname);
    const uniqueName = `${userId}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
