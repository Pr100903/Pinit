const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // ✅ renamed from 'user'
});

module.exports = mongoose.model("Pin", pinSchema);
