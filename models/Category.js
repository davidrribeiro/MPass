const mongoose = require("mongoose");

const category = mongoose.model("Category", {
  name: String,
});

module.exports = category;
