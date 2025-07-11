const express = require("express");
const router = express.Router();
const Pin = require("../models/Pin");

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find()
      .sort({ _id: -1 })
      .populate("createdBy", "username profilePic");

    res.render("pages/home", {
      user: req.user,
      pins
    });
  } catch (err) {
    console.error("Failed to load homepage:", err);
    res.status(500).send("Error loading pins.");
  }
});

module.exports = router;
