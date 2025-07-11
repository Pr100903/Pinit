const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

// Register
router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.redirect("/auth/login");
  } catch (e) {
    res.send("Error creating user");
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
);

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
