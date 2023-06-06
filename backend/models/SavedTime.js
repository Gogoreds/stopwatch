const mongoose = require("mongoose");

const savedTimeSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("SavedTime", savedTimeSchema);
