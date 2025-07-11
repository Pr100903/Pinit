const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const Board = require("../models/Board");
const Pin = require("../models/Pin");

router.get("/", async (req, res) => {
  const boards = await Board.find().populate("owner");
  res.render("pages/boards", { boards });
});

router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("pages/newBoard");
});

router.post("/", ensureAuthenticated, async (req, res) => {
  await Board.create({
    name: req.body.name,
    owner: req.user._id
  });
  res.redirect("/boards");
});

// Add pin to board
router.post("/:id/add", ensureAuthenticated, async (req, res) => {
  const board = await Board.findById(req.params.id);
  board.pins.push(req.body.pinId);
  await board.save();
  res.redirect("/boards/" + req.params.id);
});

router.get("/:id", async (req, res) => {
  const board = await Board.findById(req.params.id).populate("pins").populate("owner");
  res.render("pages/boardDetails", { board });
});

module.exports = router;
