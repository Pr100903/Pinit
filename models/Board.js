const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }]
});

module.exports = mongoose.model("Board", boardSchema);
