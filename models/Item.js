const mongoose = require("mongoose");

const item = mongoose.model("Item", {
  title: String,
  url: String,
  description: String,
  password: String,
});

module.exports = item;
