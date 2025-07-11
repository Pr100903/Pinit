const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Pin = require("../models/Pin");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET: New Pin Form
router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("pages/newPin");
});

// POST: Create New Pin
router.post("/", ensureAuthenticated, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.filename;

    await Pin.create({
      title,
      description,
      imageUrl,
      createdBy: req.user._id // ✅ FIXED: must match schema
    });

    res.redirect("/users/profile");
  } catch (err) {
    console.error("Error uploading pin:", err);
    res.status(500).send("Internal Server Error");
  }
});
// DELETE: Delete Pin
router.post("/:id/delete", ensureAuthenticated, async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin || pin.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("Not allowed");
    }

    await pin.deleteOne();
    res.redirect("/users/profile");
  } catch (err) {
    console.error("Failed to delete pin:", err);
    res.status(500).send("Internal Server Error");
  }
});

// GET: Explore All Pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find().sort({ _id: -1 });
    res.render("pages/pins", { pins });
  } catch (err) {
    console.error("Error loading pins:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
