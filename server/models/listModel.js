const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A list must have a title"],
    unique: [true, "A list title is already in use"],
    trim: true,
  },
  type: {
    type: String,
    enum: {
      values: ["movie", "series"],
      message: "Please provide the given type",
    },
    required: [true, "Please provide the type"],
  },
  content: {
    type: Array,
    required: [true, "Please provide the contents"],
  },
});
