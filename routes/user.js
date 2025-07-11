const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Pin = require("../models/Pin");
const User = require("../models/User");
const ensureAuthenticated = require("../middleware/ensureAuthenticated"); // ✅ Only once

// GET: Profile Page
router.get("/profile", ensureAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const pins = await Pin.find({ createdBy: user._id }); // ✅ FIXED
    res.render("pages/profile", {
      user,
      pins
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading profile page.");
  }
});


// POST: Upload Profile Picture
router.post("/upload-profile-pic", ensureAuthenticated, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // ✅ Store only the filename
    user.profilePic = req.file.filename;

    await user.save();
    res.redirect("/users/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload profile picture.");
  }
});


// GET: Saved Pins
router.get("/saved", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedPins");
    res.render("pages/savedPins", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading saved pins.");
  }
});

module.exports = router;
